import type { SuggestCompressionSettingsOutput } from '@/ai/flows/suggest-compression-settings';

export type CompressionLevel = 'Low' | 'Medium' | 'High';
export type FileFormat = 'PNG' | 'JPG' | 'PDF';

export interface AppFile {
  id: string;
  file: File;
  compressionLevel: CompressionLevel;
  targetFormat: FileFormat;
  status: 'pending' | 'compressing' | 'done' | 'error';
  progress: number;
  originalSize: number;
  compressedSize?: number;
  aiSuggestion?: SuggestCompressionSettingsOutput;
  error?: string;
}
