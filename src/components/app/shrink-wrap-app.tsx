"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { AppFile, CompressionLevel, FileFormat } from '@/types';
import { cn, formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  UploadCloud,
  FileImage,
  FileText,
  X,
  Sparkles,
  Download,
  FileArchive,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { getAiSuggestion } from '@/components/app/actions';
import { useToast } from '@/hooks/use-toast';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const AppHeader = () => (
  <header className="flex items-center gap-3 mb-6">
    <FileArchive className="w-8 h-8 text-primary" />
    <h1 className="text-3xl font-bold text-foreground">ShrinkWrap</h1>
  </header>
);

const FileUploader = ({
  onDrop,
  isDragActive,
}: {
  onDrop: (acceptedFiles: File[]) => void;
  isDragActive: boolean;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <Card
      className={cn(
        'w-full border-2 border-dashed transition-colors',
        isDragActive ? 'border-primary bg-accent' : 'border-border bg-card'
      )}
    >
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className="outline-none text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <UploadCloud className="w-16 h-16" />
            <p className="text-lg font-medium">
              {isDragActive
                ? 'Drop files here...'
                : 'Drag & drop files, or click to select'}
            </p>
            <p className="text-sm">Supports PNG, JPG, and PDF files</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FileItem = ({
  appFile,
  onRemove,
  onSettingChange,
}: {
  appFile: AppFile;
  onRemove: (id: string) => void;
  onSettingChange: (
    id: string,
    update: {
      key: 'compressionLevel' | 'targetFormat';
      value: CompressionLevel | FileFormat;
    }
  ) => void;
}) => {
  const { file, status, progress, originalSize, compressedSize, compressedFile } = appFile;

  const FileIcon = useMemo(() => {
    if (file.type.startsWith('image/')) return FileImage;
    if (file.type === 'application/pdf') return FileText;
    return FileImage;
  }, [file.type]);

  const savings = useMemo(() => {
    if (typeof originalSize === 'number' && typeof compressedSize === 'number' && compressedSize > 0) {
      if (compressedSize >= originalSize) {
        return {
          bytes: '0 Bytes',
          percentage: '0.0'
        }
      }
      const reduction = originalSize - compressedSize;
      const percentage = (reduction / originalSize) * 100;
      return {
        bytes: formatBytes(reduction),
        percentage: percentage.toFixed(1),
      };
    }
    return null;
  }, [originalSize, compressedSize]);

  const isProcessing = status === 'compressing' || status === 'pending';
  const isDone = status === 'done' || status === 'error';

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm relative overflow-hidden animate-in fade-in-0 slide-in-from-bottom-5 duration-300">
      {status === 'compressing' && (
        <Progress
          value={progress}
          className="absolute top-0 left-0 w-full h-1 rounded-none"
        />
      )}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0 flex items-center gap-4">
          <FileIcon className="w-10 h-10 text-primary" />
          <div className="flex-grow md:max-w-xs">
            <p className="font-medium text-foreground truncate" title={file.name}>{file.name}</p>
            <p className="text-sm text-muted-foreground">{formatBytes(originalSize)}</p>
          </div>
        </div>

        {!isDone && (
          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">Compression</Label>
              <RadioGroup
                value={appFile.compressionLevel}
                onValueChange={(value: CompressionLevel) => onSettingChange(appFile.id, { key: 'compressionLevel', value })}
                className="flex gap-2"
                disabled={isProcessing && status !== 'pending'}
              >
                {(['Low', 'Medium', 'High'] as CompressionLevel[]).map(level => (
                  <div key={level} className="flex-1">
                    <RadioGroupItem value={level} id={`${appFile.id}-${level}`} className="sr-only peer" />
                    <Label
                      htmlFor={`${appFile.id}-${level}`}
                      className="flex items-center justify-center p-2 text-sm font-medium rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                    >
                      {level}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {appFile.aiSuggestion && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <p><strong>AI Suggestion:</strong> Quality {appFile.aiSuggestion.quality}, {appFile.aiSuggestion.optimizationStrategy}</p>
                  </div>
              )}
            </div>
            <div>
                <Label className="text-xs font-medium text-muted-foreground mb-2 block">Convert To</Label>
                <Select
                    value={appFile.targetFormat}
                    onValueChange={(value: FileFormat) => onSettingChange(appFile.id, { key: 'targetFormat', value })}
                    disabled={(isProcessing && status !== 'pending') || appFile.file.type === 'application/pdf'}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PNG">PNG</SelectItem>
                        <SelectItem value="JPG">JPG</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        )}
        
        {isDone && (
            <div className="flex-grow flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <ChevronRight className="w-6 h-6 text-muted-foreground hidden sm:block" />
                    {status === 'done' ? (
                      <div>
                          <p className="font-medium text-foreground">{formatBytes(compressedSize!)}</p>
                          {savings && savings.percentage !== '0.0' ? (
                            <p className="text-sm text-green-600 font-semibold">Saved {savings.percentage}%</p>
                          ) : (
                            <p className="text-sm text-muted-foreground">No savings</p>
                          )}
                      </div>
                    ) : (
                      <div>
                          <p className="font-medium text-destructive">Failed</p>
                          <p className="text-sm text-muted-foreground">Could not compress</p>
                      </div>
                    )}
                </div>
                <Button size="sm" onClick={() => {
                  if (!compressedFile) return;
                  const url = URL.createObjectURL(compressedFile);
                  const a = document.createElement('a');
                  a.href = url;
                  // Handle potential extension changes
                  const originalName = appFile.file.name;
                  const originalExtension = originalName.split('.').pop()?.toLowerCase();
                  const targetExtension = appFile.targetFormat.toLowerCase();
                  let downloadName = `shrunk-${originalName}`;

                  if (originalExtension !== targetExtension) {
                    const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
                    downloadName = `shrunk-${baseName}.${targetExtension}`;
                  }
                  
                  a.download = downloadName;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                disabled={!compressedFile || status === 'error'}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
            </div>
        )}
      </div>
      {!isDone && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 w-7 h-7"
          onClick={() => onRemove(appFile.id)}
          disabled={status !== 'pending'}
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Remove</span>
        </Button>
      )}
    </div>
  );
};


export default function ShrinkWrapApp() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const { toast } = useToast();

  const isCompressing = useMemo(() => files.some(f => f.status === 'compressing'), [files]);
  const hasPending = useMemo(() => files.some(f => f.status === 'pending'), [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragActive(false);
    const newFiles: AppFile[] = acceptedFiles.map((file) => {
        const fileExtension = file.name.split('.').pop()?.toUpperCase() as FileFormat | undefined;
        let fileType: FileFormat = 'JPG'; // Default
        if (fileExtension && ['PNG', 'JPG', 'JPEG'].includes(fileExtension)) {
            fileType = fileExtension === 'JPEG' ? 'JPG' : fileExtension;
        } else if (fileExtension === 'PDF') {
            fileType = 'PDF';
        }
        
        return {
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            compressionLevel: 'Medium',
            targetFormat: fileType,
            status: 'pending',
            progress: 0,
            originalSize: file.size,
        }
    });
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSettingChange = useCallback(async (
    id: string,
    update: {
      key: 'compressionLevel' | 'targetFormat';
      value: CompressionLevel | FileFormat;
    }
  ) => {
    let updatedFile: AppFile | undefined;
    setFiles((prevFiles) =>
      prevFiles.map((f) => {
        if (f.id === id) {
          updatedFile = { ...f, [update.key]: update.value };
          return updatedFile;
        }
        return f;
      })
    );
    
    if (update.key === 'compressionLevel' && updatedFile) {
        const fileType = updatedFile.file.type.split('/')[1].toUpperCase();
        if(['PNG', 'JPG', 'PDF'].includes(fileType)){
            try {
              const suggestion = await getAiSuggestion({
                  compressionLevel: update.value as CompressionLevel,
                  fileType: fileType as 'PNG' | 'JPG' | 'PDF'
              });
              if(suggestion) {
                  setFiles(prev => prev.map(f => f.id === id ? {...f, aiSuggestion: suggestion} : f));
              }
            } catch (e) {
                console.error("Failed to get AI suggestion", e);
            }
        }
    }
  }, []);

  const getCompressionOptions = (level: CompressionLevel, fileType: 'PNG' | 'JPG') => {
    // These are example values. In a real app, these could be more nuanced.
    switch (level) {
        case 'Low':
            return { maxSizeMB: 2, initialQuality: 0.9, alwaysKeepResolution: true };
        case 'Medium':
            return { maxSizeMB: 1, initialQuality: 0.7 };
        case 'High':
            return { maxSizeMB: 0.5, initialQuality: 0.5 };
        default:
            return { maxSizeMB: 1, initialQuality: 0.7 };
    }
  };


  const handleCompressFile = async (fileToCompress: AppFile) => {
    setFiles(prev => prev.map(f => f.id === fileToCompress.id ? { ...f, status: 'compressing', progress: 0 } : f));
    try {
        const isImage = fileToCompress.file.type.startsWith('image/');
        const isPdf = fileToCompress.file.type === 'application/pdf';
        let finalFile: Blob;
        let finalSize: number;

        if (isImage && (fileToCompress.targetFormat === 'JPG' || fileToCompress.targetFormat === 'PNG')) {
            const options = getCompressionOptions(fileToCompress.compressionLevel, fileToCompress.targetFormat);

            const compressedFile = await imageCompression(fileToCompress.file, {
                ...options,
                onProgress: (p: number) => {
                    setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {...f, progress: p} : f));
                },
                fileType: fileToCompress.targetFormat.toLowerCase(),
            });

            if (compressedFile.size > fileToCompress.originalSize) {
                // If compressed is larger, use original
                finalFile = fileToCompress.file;
                finalSize = fileToCompress.originalSize;
                toast({
                  title: "No Savings",
                  description: `${fileToCompress.file.name} is already optimized. Using original file.`,
                })
            } else {
                finalFile = compressedFile;
                finalSize = compressedFile.size;
            }
        } else if (isPdf) {
             // For PDFs or other non-image files, just pass through
             await new Promise(resolve => setTimeout(resolve, 500)); // Simulate work
             setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {...f, progress: 50} : f));
             await new Promise(resolve => setTimeout(resolve, 500));
             finalFile = fileToCompress.file;
             finalSize = fileToCompress.originalSize;
             toast({
                title: "PDF Handling",
                description: `PDF compression is not supported. The original file will be used.`,
             });
        } else {
            // Should not happen with current dropzone config, but as a fallback
            toast({
                variant: "destructive",
                title: "Unsupported File Type",
                description: `Cannot process this file type.`,
            });
            throw new Error('Unsupported file type');
        }
        
        setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {
            ...f, 
            status: 'done', 
            progress: 100,
            compressedSize: finalSize,
            compressedFile: finalFile,
        } : f));

    } catch (error) {
        console.error('Compression error:', error);
        setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {
            ...f, 
            status: 'error', 
            error: (error as Error).message || 'Compression failed',
            progress: 100
        } : f));
        if ((error as Error).message !== 'Unsupported conversion' && (error as Error).message !== 'Unsupported file type') {
            toast({
                variant: "destructive",
                title: "Compression Failed",
                description: `Could not compress ${fileToCompress.file.name}.`,
            });
        }
    }
  }

  const handleCompressAll = async () => {
    if(isCompressing) return;

    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    toast({
        title: "Compression Started",
        description: `Optimizing ${pendingFiles.length} file(s).`,
    });
    
    // Process files one by one to avoid overwhelming the browser
    for (const file of pendingFiles) {
        await handleCompressFile(file);
    }

    toast({
        title: "Compression Complete",
        description: "All files have been processed.",
    });
  };

  const handleClearAll = () => {
    setFiles([]);
  }

  const handleReset = () => {
    setFiles(files.map(f => ({...f, status: 'pending', progress: 0, compressedSize: undefined, compressedFile: undefined, aiSuggestion: undefined})));
  }

  const allDone = files.length > 0 && files.every(f => f.status === 'done' || f.status === 'error');

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
      <AppHeader />
      <main className="flex-grow">
        {files.length === 0 ? (
          <FileUploader onDrop={onDrop} isDragActive={isDragActive} />
        ) : (
          <div className="space-y-3">
            {files.map((appFile) => (
              <FileItem
                key={appFile.id}
                appFile={appFile}
                onRemove={handleRemoveFile}
                onSettingChange={handleSettingChange}
              />
            ))}
          </div>
        )}
      </main>
      {files.length > 0 && (
        <footer className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-lg shadow-sm sticky bottom-4">
          <p className="text-sm text-muted-foreground">{files.length} file(s) added.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={allDone ? handleClearAll : handleReset}>
                {allDone ? 'Clear All' : 'Reset'}
            </Button>
            <Button 
                onClick={handleCompressAll} 
                disabled={isCompressing || !hasPending} 
                className="bg-[#ADFF2F] hover:bg-[#98e228] text-green-950 font-semibold"
            >
                {isCompressing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compressing...</> : allDone ? 'All Done!' : 'Compress Files'}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
