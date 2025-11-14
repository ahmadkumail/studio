
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
    <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="w-full text-left">
      <AccordionItem value="item-1">
        <AccordionTrigger>What makes ShrinkWrap different from other tools?</AccordionTrigger>
        <AccordionContent>
          It comes down to two big things: total privacy and smart suggestions. Unlike most online tools that upload your files to their servers, ShrinkWrap does all the work right in your browser. This means your files never leave your computer. Plus, our AI engine takes the guesswork out of compression. It suggests the best settings to give you a perfect balance between file size and quality, so you get a professional result without being a tech expert.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it actually private and secure?</AccordionTrigger>
        <AccordionContent>
          Yes, 100%. We built ShrinkWrap with a "privacy-first" promise. Since all the compression happens locally on your own device, we never see, touch, or store your files. This makes ShrinkWrap as secure as any offline desktop software, but with the convenience of a tool you can access from anywhere. Your business is your business, and we intend to keep it that way.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does the AI suggestion feature work?</AccordionTrigger>
        <AccordionContent>
          Think of it like having a compression expert whispering in your ear. Our AI has been trained to understand the delicate balance between image quality and file size. When you pick a general goal (like 'Low', 'Medium', or 'High' compression), the AI instantly analyzes the image and recommends a precise quality setting and strategy to hit that goal. It’s the fastest way to get a fantastic result without fiddling with confusing sliders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What's the difference between Low, Medium, and High compression?</AccordionTrigger>
        <AccordionContent>
          It’s a simple way for you to tell us what matters most for each image:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Low:</strong> This setting prioritizes image quality above all else. The file size reduction will be smaller, but your image will keep its maximum detail. It's the best choice for high-resolution portfolio pieces or professional photography where every pixel counts.</li>
            <li><strong>Medium:</strong> This is the sweet spot and our recommended setting for most everyday use. It gives you a huge reduction in file size with almost no noticeable loss in quality. It's perfect for speeding up your website, attaching to emails, or posting on social media.</li>
            <li><strong>High:</strong> This setting is all about getting the smallest possible file size. It's an aggressive option that will make your file tiny, which might lead to some visible quality loss. It's the right choice when file size is the absolute top priority.</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
       <AccordionItem value="item-5">
        <AccordionTrigger>Can I compress more than one image at a time?</AccordionTrigger>
        <AccordionContent>
          Absolutely. We designed ShrinkWrap for real-world workflows, and that means batch processing is a core feature. You can drag and drop a whole folder of PNG or JPG files (up to 10 at a time), apply compression settings to all of them at once, and then compress the entire batch with a single click. It's a huge time-saver.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Which file format should I choose: JPG or PNG?</AccordionTrigger>
        <AccordionContent>
          This is a fantastic and important question. The right format depends entirely on the image itself. Here's a simple rule of thumb we live by:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Use JPG for photos</strong> and other complex images with millions of colors, gradients, and textures. Its compression is specifically designed for this.</li>
            <li><strong>Use PNG for graphics</strong> that have sharp lines, text, solid colors, or when you need a transparent background (like a logo). PNG will keep these details perfectly crisp.</li>
          </ul>
          Our tool also lets you convert between formats, so feel free to experiment and see what works best for your specific image!
        </AccordionContent>
      </AccordionItem>
       <AccordionItem value="item-7">
        <AccordionTrigger>Why is image compression so important anyway?</AccordionTrigger>
        <AccordionContent>
          Optimized images are one of the most critical elements of a fast, modern website. Smaller images make your site load dramatically faster, which creates a better user experience, keeps visitors from leaving, and is a major factor in ranking higher on search engines like Google. Beyond SEO, it saves you storage space and reduces bandwidth costs for both you and your visitors. It’s a win-win-win.
        </AccordionContent>
      </AccordionItem>
       <AccordionItem value="item-8">
        <AccordionTrigger>Is ShrinkWrap really free? What's the catch?</AccordionTrigger>
        <AccordionContent>
          Yes, ShrinkWrap is 100% free, and there's no catch. We're a small team of developers who are passionate about building great tools for the community. We believe everyone deserves access to high-quality software without dealing with subscriptions, hidden fees, or worrying about their data being sold. ShrinkWrap is our contribution to making the web a little bit faster and more private for everyone.
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
                ? 'Drop your files to start compressing!'
                : "Drag & drop images, or click to select"}
            </p>
            <p className="text-sm text-muted-foreground">Supports PNG & JPG files up to 100MB each</p>
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
          <FileImage className="w-10 h-10 text-primary shrink-0" aria-label="Image file icon" />
          <div className="flex-grow min-w-0">
            <p className="font-medium text-foreground truncate" title={file.name}>{file.name}</p>
            <p className="text-sm text-muted-foreground">{formatBytes(originalSize)}</p>
          </div>
        </div>

        <div className="flex-grow w-full md:w-2/3">
            {status === 'compressing' ? (
                <div className="flex items-center justify-center w-full gap-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" aria-label="Loading" />
                    <span className="text-sm font-medium text-muted-foreground">Compressing... {progress.toFixed(0)}%</span>
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
                                <p><strong>AI Suggests:</strong> Quality {appFile.aiSuggestion.quality}, {appFile.aiSuggestion.optimizationStrategy}</p>
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
            id: `${file.name}-${file.lastModified}`,
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
            return { maxSizeMB: 1, useWebWorker: true };
        case 'Medium':
            return { maxSizeMB: 0.5, useWebWorker: true };
        case 'High':
            return { maxSizeMB: 0.1, useWebWorker: true };
        default:
            return { maxSizeMB: 0.5, useWebWorker: true };
    }
  };


  const handleCompressFile = async (fileToCompress: AppFile) => {
    setFiles(prev => prev.map(f => f.id === fileToCompress.id ? { ...f, status: 'compressing', progress: 0 } : f));
    try {
        const options = getCompressionOptions(fileToCompress.compressionLevel);

        const compressedFile = await imageCompression(fileToCompress.file, {
            ...options,
            onProgress: (p: number) => {
                setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {...f, progress: p} : f));
            },
            fileType: fileToCompress.targetFormat.toLowerCase(),
        });
        
        if (compressedFile.size >= fileToCompress.originalSize) {
             toast({
                title: "Already Optimized",
                description: `${fileToCompress.file.name} is already as small as it can get.`,
            });
             setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {
                ...f, 
                status: 'done', 
                progress: 100,
                compressedSize: fileToCompress.originalSize,
                compressedFile: fileToCompress.file,
            } : f));
        } else {
             setFiles(prev => prev.map(f => f.id === fileToCompress.id ? {
                ...f, 
                status: 'done', 
                progress: 100,
                compressedSize: compressedFile.size,
                compressedFile: compressedFile,
            } : f));
        }
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
                description: `We couldn't compress ${fileToCompress.file.name}. Please try again.`,
            });
        }
    }
  }

  const handleCompressAll = async () => {
    if(isCompressing) return;

    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    toast({
        title: "Starting Compression...",
        description: `Optimizing ${pendingFiles.length} file(s). This might take a moment.`,
    });
    
    // Process files one by one to avoid overwhelming the browser
    for (const file of pendingFiles) {
        await handleCompressFile(file);
    }

    toast({
        title: "Compression Complete!",
        description: "All your files have been optimized.",
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">The Smart Way to Compress Images</h1>
            <div className="mt-8 text-foreground text-lg text-center">
                <h2 className="text-2xl font-semibold">Shrink your PNG & JPG files with our privacy-first, AI-powered tool.</h2>
                <p className="max-w-prose mx-auto mt-2 text-muted-foreground">ShrinkWrap is a free online compressor that dramatically reduces image file sizes without sacrificing quality. Our AI gives you expert results instantly, and everything happens in your browser so your files stay 100% private.</p>
            </div>
            
            <FileUploader onDrop={onDrop} isDragActive={isDragActive} />
            
            <div className="max-w-5xl mx-auto my-12 space-y-16">
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground text-center">How It Works: 3 Simple Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <UploadCloud className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">1. Upload Your Images</h3>
                            <p className="text-muted-foreground text-sm">Drag and drop your PNG or JPG files, or click to select them from your computer.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <Zap className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">2. Choose Your Setting</h3>
                            <p className="text-muted-foreground text-sm">Select a compression level, or let our AI suggest the perfect settings for you.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <Download className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">3. Download & Enjoy</h3>
                            <p className="text-muted-foreground text-sm">Download your newly lightweight images and enjoy a faster, more efficient website.</p>
                        </div>
                    </div>
                </section>
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground text-center">Why You'll Love ShrinkWrap</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="text-center p-6 bg-card/50">
                            <BadgePercent className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Powerful Compression</h3>
                            <p className="text-muted-foreground text-sm">Cut file sizes by up to 80% with advanced algorithms that intelligently preserve quality.</p>
                        </Card>
                        <Card className="text-center p-6 bg-card/50">
                            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Absolute Privacy</h3>
                            <p className="text-muted-foreground text-sm">All processing is done 100% in your browser. Your files never leave your computer.</p>
                        </Card>
                        <Card className="text-center p-6 bg-card/50">
                            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
                            <p className="text-muted-foreground text-sm">Our AI engine analyzes your file and recommends optimal settings for the best results.</p>
                        </Card>
                        <Card className="text-center p-6 bg-card/50">
                            <Package className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
                            <p className="text-muted-foreground text-sm">Save time by compressing multiple PNG and JPG images at once with a single click.</p>
                        </Card>
                    </div>
                </section>

                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-foreground text-center">Optimize Your Site, Boost Your Success</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center p-6">
                            <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Faster Websites</h3>
                            <p className="text-muted-foreground text-sm">Dramatically speed up your site's loading times, improve user experience, and keep visitors engaged.</p>
                        </Card>
                        <Card className="text-center p-6">
                            <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Improved SEO</h3>
                            <p className="text-muted-foreground text-sm">Faster sites rank higher on search engines like Google, which means more organic traffic for you.</p>
                        </Card>
                        <Card className="text-center p-6">
                            <Database className="w-10 h-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Save Bandwidth & Space</h3>
                            <p className="text-muted-foreground text-sm">Smaller images save you storage space and reduce bandwidth costs for you and your visitors.</p>
                        </Card>
                    </div>
                </section>
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
          <p className="text-sm text-muted-foreground">{files.length} file(s) in the queue.</p>
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
