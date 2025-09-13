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
  Loader2,
  ChevronRight,
  Trash2,
  RotateCcw,
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
import { PandaIcon } from '@/components/icons/panda-icon';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const AppHeader = () => (
    <header className="flex items-center gap-3 mb-8 text-center">
      <PandaIcon className="w-12 h-12 text-primary" />
      <div>
        <h1 className="text-3xl font-bold text-foreground">ShrinkWrap</h1>
        <p className="text-muted-foreground">Compress your files with ease</p>
      </div>
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
        'w-full border-2 border-dashed transition-all duration-300',
        isDragActive ? 'border-primary bg-primary/10' : 'border-border bg-card'
      )}
    >
      <CardContent className="p-8 sm:p-12">
        <div
          {...getRootProps()}
          className="outline-none text-center cursor-pointer group"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <UploadCloud className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
            <p className="text-lg font-medium">
              {isDragActive
                ? 'Drop files to start compressing!'
                : "Drag & drop, or click to select"}
            </p>
            <p className="text-sm">Supports PNG, JPG, and PDF files up to 100MB</p>
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
  const { file, status, progress, originalSize, compressedSize } = appFile;

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
          percentage: '0.0',
          isIncrease: compressedSize > originalSize,
        }
      }
      const reduction = originalSize - compressedSize;
      const percentage = (reduction / originalSize) * 100;
      return {
        bytes: formatBytes(reduction),
        percentage: percentage.toFixed(1),
        isIncrease: false,
      };
    }
    return null;
  }, [originalSize, compressedSize]);

  const isProcessing = status === 'compressing' || status === 'pending';
  const isDone = status === 'done' || status === 'error';
  const isPdf = appFile.file.type === 'application/pdf';

  return (
    <Card className="bg-card p-4 relative overflow-hidden animate-in fade-in-0 slide-in-from-bottom-5 duration-300 shadow-sm">
      {status === 'compressing' && (
        <Progress
          value={progress}
          className="absolute top-0 left-0 w-full h-1 rounded-none"
        />
      )}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-shrink-0 flex items-center gap-4 w-full md:w-1/3">
          <FileIcon className="w-10 h-10 text-primary shrink-0" />
          <div className="flex-grow min-w-0">
            <p className="font-medium text-foreground truncate" title={file.name}>{file.name}</p>
            <p className="text-sm text-muted-foreground">{formatBytes(originalSize)}</p>
          </div>
        </div>

        <div className="flex-grow w-full md:w-2/3">
            {!isDone ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div>
                        <Label className="text-xs font-medium text-muted-foreground mb-2 block">Compression</Label>
                        <RadioGroup
                            value={appFile.compressionLevel}
                            onValueChange={(value: CompressionLevel) => onSettingChange(appFile.id, { key: 'compressionLevel', value })}
                            className="flex gap-2"
                            disabled={(isProcessing && status !== 'pending') || isPdf}
                        >
                            {(['Low', 'Medium', 'High'] as CompressionLevel[]).map(level => (
                            <div key={level} className="flex-1">
                                <RadioGroupItem value={level} id={`${appFile.id}-${level}`} className="sr-only peer" />
                                <Label
                                htmlFor={`${appFile.id}-${level}`}
                                className="flex items-center justify-center py-1.5 px-2 text-sm font-medium rounded-md border-2 border-muted bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors h-full"
                                >
                                {level}
                                </Label>
                            </div>
                            ))}
                        </RadioGroup>
                        {appFile.aiSuggestion && (
                            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <p><strong>AI:</strong> Quality {appFile.aiSuggestion.quality}, {appFile.aiSuggestion.optimizationStrategy}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <Label className="text-xs font-medium text-muted-foreground mb-2 block">Convert To</Label>
                        <Select
                            value={appFile.targetFormat}
                            onValueChange={(value: FileFormat) => onSettingChange(appFile.id, { key: 'targetFormat', value })}
                            disabled={(isProcessing && status !== 'pending') || isPdf}
                        >
                            <SelectTrigger className="h-auto py-1.5">
                                <SelectValue placeholder="Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PNG">PNG</SelectItem>
                                <SelectItem value="JPG">JPG</SelectItem>
                                {isPdf && <SelectItem value="PDF">PDF</SelectItem>}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <ChevronRight className="w-6 h-6 text-muted-foreground hidden sm:block" />
                        {status === 'done' ? (
                        <div className="text-sm">
                            <p className="font-medium text-foreground">{formatBytes(compressedSize!)}</p>
                            {savings && savings.percentage !== '0.0' ? (
                                <p className="text-green-500 font-semibold">Saved {savings.percentage}%</p>
                            ) : (
                                <p className="text-muted-foreground">{savings?.isIncrease ? 'Size increased' : 'No savings'}</p>
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
                        const { compressedFile, file, targetFormat } = appFile;
                        if (!compressedFile) return;
                        const url = URL.createObjectURL(compressedFile);
                        const a = document.createElement('a');
                        a.href = url;
                        
                        const originalName = file.name;
                        const originalExtension = originalName.split('.').pop()?.toLowerCase();
                        const targetExtension = targetFormat.toLowerCase();
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
                        disabled={!appFile.compressedFile || status === 'error'}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            )}
        </div>
        
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 w-7 h-7 text-muted-foreground hover:text-foreground"
            onClick={() => onRemove(appFile.id)}
            disabled={status === 'compressing'}
            >
            <X className="w-4 h-4" />
            <span className="sr-only">Remove</span>
        </Button>
      </div>
    </Card>
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
        let fileType: FileFormat;

        if (fileExtension === 'PDF') {
            fileType = 'PDF';
        } else if (fileExtension === 'PNG') {
            fileType = 'PNG';
        } else if (fileExtension === 'JPEG' || fileExtension === 'JPG') {
            fileType = 'JPG';
        } else {
            // As a fallback for other image types that might sneak in
            fileType = 'JPG';
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

  const getCompressionOptions = (level: CompressionLevel) => {
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
            const options = getCompressionOptions(fileToCompress.compressionLevel);

            const compressedFile = await imageCompression(fileToCompress.file, {
                ...options,
                onProgress: (p: number) => {
                    setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {...f, progress: p} : f));
                },
                fileType: fileToCompress.targetFormat.toLowerCase(),
            });

            if (compressedFile.size > fileToCompress.originalSize) {
                finalFile = fileToCompress.file;
                finalSize = fileToCompress.originalSize;
                toast({
                  title: "Already Optimized",
                  description: `${fileToCompress.file.name} could not be compressed further.`,
                })
            } else {
                finalFile = compressedFile;
                finalSize = compressedFile.size;
            }
        } else if (isPdf) {
             await new Promise(resolve => setTimeout(resolve, 500));
             setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {...f, progress: 50} : f));
             await new Promise(resolve => setTimeout(resolve, 500));
             finalFile = fileToCompress.file;
             finalSize = fileToCompress.originalSize;
             toast({
                title: "PDF Handling",
                description: `PDF compression is not yet supported.`,
             });
        } else {
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
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full items-center">
      <AppHeader />
      <main className="flex-grow w-full">
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
        <footer className="mt-6 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg sticky bottom-4 border">
          <p className="text-sm text-muted-foreground">{files.length} file(s) selected.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={allDone ? handleClearAll : handleReset}>
                {allDone ? <><Trash2 className="mr-2 h-4 w-4" /> Clear All</> : <><RotateCcw className="mr-2 h-4 w-4" /> Reset</>}
            </Button>
            <Button 
                onClick={handleCompressAll} 
                disabled={isCompressing || !hasPending || allDone} 
            >
                {isCompressing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compressing...</> : allDone ? 'All Done!' : 'Compress Files'}
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
