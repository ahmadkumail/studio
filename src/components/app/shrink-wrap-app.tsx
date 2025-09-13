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
  Sparkles,
  Download,
  Loader2,
  ChevronRight,
  Trash2,
  RotateCcw,
  MousePointerClick,
  FileDown,
  Zap,
  BrainCircuit,
  ShieldCheck,
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
import { useToast } from '@/hooks/use-toast';
import { getAiSuggestion } from './actions';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const HowItWorks = () => (
  <div className="w-full max-w-2xl mx-auto text-center my-12">
    <h2 className="text-2xl font-semibold text-foreground mb-4">How It Works</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
          <UploadCloud className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold">1. Upload Files</h3>
        <p className="text-sm text-muted-foreground">Drag and drop or click to select PNG or JPG files.</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
          <MousePointerClick className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold">2. Choose Settings</h3>
        <p className="text-sm text-muted-foreground">Select compression level and get AI-powered suggestions.</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
          <FileDown className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold">3. Compress & Download</h3>
        <p className="text-sm text-muted-foreground">Optimize your files and download the compressed versions.</p>
      </div>
    </div>
  </div>
);

const WhyShrinkWrap = () => (
    <div className="w-full max-w-4xl mx-auto text-center mt-12">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Why ShrinkWrap?</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <Card className="p-6 bg-card/50">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Lightning Fast</h3>
          </div>
          <p className="text-sm text-muted-foreground">Our tool is built for speed, compressing your images in seconds, right in your browser.</p>
        </Card>
        <Card className="p-6 bg-card/50">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">AI-Powered</h3>
          </div>
          <p className="text-sm text-muted-foreground">Get smart suggestions for optimal compression settings, balancing quality and file size perfectly.</p>
        </Card>
        <Card className="p-6 bg-card/50">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Private & Secure</h3>
          </div>
          <p className="text-sm text-muted-foreground">Your files are processed on your device and are never uploaded to a server, ensuring your data remains private.</p>
        </Card>
      </div>
    </div>
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
    },
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <Card
      className={cn(
        'w-full border-2 border-dashed transition-all duration-300 shadow-lg',
        isDragActive ? 'border-primary bg-primary/20 scale-105' : 'border-primary/50 bg-primary/10'
      )}
    >
      <CardContent className="p-8 sm:p-12">
        <div
          {...getRootProps()}
          className="outline-none text-center cursor-pointer group"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 text-primary-foreground">
            <UploadCloud className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 text-primary" />
            <p className="text-lg font-medium text-foreground">
              {isDragActive
                ? 'Drop files to start compressing!'
                : "Drag & drop, or click to select"}
            </p>
            <p className="text-sm text-muted-foreground">Supports PNG and JPG files up to 100MB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FileItem = ({
  appFile,
  onSettingChange,
}: {
  appFile: AppFile;
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
    return FileImage;
  }, []);

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

  return (
    <Card className="bg-card p-4 relative overflow-hidden animate-in fade-in-0 slide-in-from-bottom-5 duration-300 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-shrink-0 flex items-center gap-4 w-full md:w-1/3">
          <FileIcon className="w-10 h-10 text-primary shrink-0" />
          <div className="flex-grow min-w-0">
            <p className="font-medium text-foreground truncate" title={file.name}>{file.name}</p>
            <p className="text-sm text-muted-foreground">{formatBytes(originalSize)}</p>
          </div>
        </div>

        <div className="flex-grow w-full md:w-2/3">
            {status === 'compressing' ? (
                <div className="flex items-center justify-center w-full gap-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-sm font-medium text-muted-foreground">Processing... {progress.toFixed(0)}%</span>
                </div>
            ) : !isDone ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div>
                        <Label className="text-xs font-medium text-muted-foreground mb-2 block">Compression</Label>
                        <RadioGroup
                            value={appFile.compressionLevel}
                            onValueChange={(value: CompressionLevel) => onSettingChange(appFile.id, { key: 'compressionLevel', value })}
                            className="flex gap-2"
                            disabled={(isProcessing && status !== 'pending')}
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
                                <p><strong>AI Suggestion:</strong> Quality {appFile.aiSuggestion.quality}, {appFile.aiSuggestion.optimizationStrategy}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <Label className="text-xs font-medium text-muted-foreground mb-2 block">Convert To</Label>
                        <Select
                            value={appFile.targetFormat}
                            onValueChange={(value: FileFormat) => onSettingChange(appFile.id, { key: 'targetFormat', value })}
                            disabled={(isProcessing && status !== 'pending')}
                        >
                            <SelectTrigger className="h-auto py-1.5">
                                <SelectValue placeholder="Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PNG">PNG</SelectItem>
                                <SelectItem value="JPG">JPG</SelectItem>
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

        if (fileExtension === 'PNG') {
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
        if(['PNG', 'JPG'].includes(fileType)){
            try {
              const suggestion = await getAiSuggestion({
                  compressionLevel: update.value as CompressionLevel,
                  fileType: fileType as 'PNG' | 'JPG'
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
        let finalFile: Blob;
        let finalSize: number;

        if (fileToCompress.targetFormat === 'JPG' || fileToCompress.targetFormat === 'PNG') {
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
  
  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const allDone = files.length > 0 && files.every(f => f.status === 'done' || f.status === 'error');

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
      <main className="flex-grow w-full mt-8">
        {files.length === 0 ? (
          <>
            <FileUploader onDrop={onDrop} isDragActive={isDragActive} />
            <HowItWorks />
            <WhyShrinkWrap />
          </>
        ) : (
          <div className="space-y-3">
            {files.map((appFile) => (
              <FileItem
                key={appFile.id}
                appFile={appFile}
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
