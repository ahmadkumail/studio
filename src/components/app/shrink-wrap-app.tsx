
"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { AppFile, CompressionLevel, FileFormat } from '@/types';
import { cn, formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UploadCloud,
  FileImage,
  Sparkles,
  Download,
  Loader2,
  ChevronRight,
  Trash2,
  RotateCcw,
  Zap,
  BadgePercent,
  ShieldCheck,
  Smartphone,
  Package,
  Rocket,
  TrendingUp,
  Database
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const MAX_FILES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const FAQs = () => (
    <div id="faq" className="w-full max-w-4xl mx-auto my-12 md:my-16">
      <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full text-left">
        <AccordionItem value="item-1">
          <AccordionTrigger>1. How can I compress JPG images online for free?</AccordionTrigger>
          <AccordionContent>
          You can use ShrinkWrap to compress JPG images online without losing quality. Simply upload your JPG file, and our tool will reduce the size instantly.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>2. Can I reduce PNG file size without losing quality?</AccordionTrigger>
          <AccordionContent>
          Yes! ShrinkWrap uses smart compression technology that reduces PNG file size while maintaining maximum image quality.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>3. Is ShrinkWrap free to use?</AccordionTrigger>
          <AccordionContent>
          Absolutely! ShrinkWrap is a free PNG and JPG image compressor. No hidden charges, no sign-up required.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>4. Does ShrinkWrap work on mobile?</AccordionTrigger>
          <AccordionContent>
          Yes, ShrinkWrap is a mobile-friendly image compressor. You can compress JPG and PNG images directly from your phone browser.
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="item-5">
          <AccordionTrigger>5. How small can I shrink my images?</AccordionTrigger>
          <AccordionContent>
          Our compressor can reduce JPG and PNG images up to 80% of their original size, depending on the image quality and format.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>6. Can I convert JPG to WebP using ShrinkWrap?</AccordionTrigger>
          <AccordionContent>
          Yes, ShrinkWrap also provides image conversion features like JPG to WebP for faster website loading and better optimization.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
        'w-full border-2 border-dashed transition-all duration-300 shadow-lg my-8 md:my-12',
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
            <UploadCloud className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 text-primary" aria-label="File upload" />
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
          <FileIcon className="w-10 h-10 text-primary shrink-0" aria-label="Image file icon" />
          <div className="flex-grow min-w-0">
            <p className="font-medium text-foreground truncate" title={file.name}>{file.name}</p>
            <p className="text-sm text-muted-foreground">{formatBytes(originalSize)}</p>
          </div>
        </div>

        <div className="flex-grow w-full md:w-2/3">
            {status === 'compressing' ? (
                <div className="flex items-center justify-center w-full gap-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" aria-label="Loading" />
                    <span className="text-sm font-medium text-muted-foreground">Processing... {progress.toFixed(0)}%</span>
                </div>
            ) : !isDone ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start w-full">
                    <div>
                        <Label htmlFor={`${appFile.id}-compression-level`} className="text-xs font-medium text-muted-foreground mb-2 block">Compression</Label>
                        <RadioGroup
                            id={`${appFile.id}-compression-level`}
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
                                <Sparkles className="w-3.5 h-3.5 text-primary" aria-label="AI suggestion icon" />
                                <p><strong>AI Suggestion:</strong> Quality {appFile.aiSuggestion.quality}, {appFile.aiSuggestion.optimizationStrategy}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <Label htmlFor={`${appFile.id}-convert-to`} className="text-xs font-medium text-muted-foreground mb-2 block">Convert To</Label>
                        <Select
                            value={appFile.targetFormat}
                            onValueChange={(value: FileFormat) => onSettingChange(appFile.id, { key: 'targetFormat', value })}
                            disabled={(isProcessing && status !== 'pending')}
                        >
                            <SelectTrigger id={`${appFile.id}-convert-to`} className="h-auto py-1.5">
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-4">
                        <ChevronRight className="w-6 h-6 text-muted-foreground hidden sm:block" aria-hidden="true" />
                        {status === 'done' ? (
                        <div className="text-sm text-center sm:text-left">
                            <p className="font-medium text-foreground">{formatBytes(compressedSize!)}</p>
                            {savings && savings.percentage !== '0.0' ? (
                                <p className="text-green-500 font-semibold">Saved {savings.percentage}%</p>
                            ) : (
                                <p className="text-muted-foreground">{savings?.isIncrease ? 'Size increased' : 'No savings'}</p>
                            )}
                        </div>
                        ) : (
                        <div className="text-center sm:text-left">
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
            return { maxSizeMB: 2, initialQuality: 0.85, alwaysKeepResolution: true };
        case 'Medium':
            return { maxSizeMB: 1, initialQuality: 0.75 };
        case 'High':
            return { maxSizeMB: 0.5, initialQuality: 0.6 };
        default:
            return { maxSizeMB: 1, initialQuality: 0.75 };
    }
  };


  const handleCompressFile = async (fileToCompress: AppFile) => {
    setFiles(prev => prev.map(f => f.id === fileToCompress.id ? { ...f, status: 'compressing', progress: 0 } : f));
    try {
        let finalFile: Blob = fileToCompress.file;
        let finalSize: number = fileToCompress.originalSize;

        const options = getCompressionOptions(fileToCompress.compressionLevel);

        const compressedFile = await imageCompression(fileToCompress.file, {
            ...options,
            onProgress: (p: number) => {
                setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {...f, progress: p} : f));
            },
            fileType: fileToCompress.targetFormat.toLowerCase(),
        });
        
        if (compressedFile.size < fileToCompress.originalSize) {
            finalFile = compressedFile;
            finalSize = compressedFile.size;
        } else {
            toast({
                title: "Already Optimized",
                description: `${fileToCompress.file.name} could not be compressed further. Using original.`,
            });
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
      <main className="flex-grow w-full mt-4 md:mt-8">
        {files.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground">Free Online PNG & JPG Image Compressor - ShrinkWrap</h1>
            <div className="mt-8 text-foreground text-lg text-center">
                <h2 className="text-2xl font-semibold">Compress PNG and JPG Images Online Without Losing Quality</h2>
                <p className="max-w-prose mx-auto mt-2 text-muted-foreground">ShrinkWrap is a fast and secure image compressor that helps you reduce PNG and JPG file sizes instantly while keeping the best quality.</p>
            </div>
            
            <FileUploader onDrop={onDrop} isDragActive={isDragActive} />
            
            <div className="max-w-4xl mx-auto my-12 space-y-16">
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-foreground text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <UploadCloud className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">1. Upload Your Image</h3>
                            <p className="text-muted-foreground text-sm">Drag and drop or click to select your PNG or JPG files.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <Zap className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">2. Compress Instantly</h3>
                            <p className="text-muted-foreground text-sm">Our AI optimizes your image for the best size and quality.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <Download className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="font-semibold mb-2">3. Download a shrunk file</h3>
                            <p className="text-muted-foreground text-sm">Download your newly compressed, lightweight image.</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-foreground text-center">Why ShrinkWrap?</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center p-6">
                            <BadgePercent className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">High Compression</h3>
                            <p className="text-muted-foreground text-sm">Reduce file size up to 80% with minimal quality loss.</p>
                        </Card>
                        <Card className="text-center p-6">
                            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Privacy First</h3>
                            <p className="text-muted-foreground text-sm">All processing is done in your browser. Files never leave your device.</p>
                        </Card>
                         <Card className="text-center p-6">
                            <Smartphone className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                            <p className="text-muted-foreground text-sm">Works seamlessly on your desktop, tablet, and smartphone.</p>
                        </Card>
                        <Card className="text-center p-6">
                            <Package className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Batch Processing</h3>
                            <p className="text-muted-foreground text-sm">Compress multiple PNG or JPG images at once.</p>
                        </Card>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold text-foreground text-center">Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center p-6">
                            <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Faster Websites</h3>
                            <p className="text-muted-foreground text-sm">Dramatically speed up your website's loading times, which directly improves user experience and keeps visitors engaged.</p>
                        </Card>
                        <Card className="text-center p-6">
                            <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Improved SEO</h3>
                            <p className="text-muted-foreground text-sm">Faster sites rank higher on search engines like Google, boosting your SEO and driving more organic traffic to your page.</p>
                        </Card>
                        <Card className="text-center p-6">
                            <Database className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Save Storage</h3>
                            <p className="text-muted-foreground text-sm">Smaller image files save valuable storage space and reduce bandwidth consumption for you and your users.</p>
                        </Card>
                    </div>
                </div>
            </div>

            <FAQs />
          </div>
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

    