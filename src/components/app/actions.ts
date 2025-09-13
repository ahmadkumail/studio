'use server';

import { suggestCompressionSettings, type SuggestCompressionSettingsInput } from '@/ai/flows/suggest-compression-settings';

export async function getAiSuggestion(input: SuggestCompressionSettingsInput) {
  try {
    const suggestion = await suggestCompressionSettings(input);
    return suggestion;
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    // In a real app, you might want to return a more specific error object
    return null;
  }
}
