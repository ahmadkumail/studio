'use server';

/**
 * @fileOverview A flow that suggests optimal compression settings based on the user's selected level (Low, Medium, High).
 *
 * - suggestCompressionSettings - A function that suggests compression settings.
 * - SuggestCompressionSettingsInput - The input type for the suggestCompressionSettings function.
 * - SuggestCompressionSettingsOutput - The return type for the suggestCompressionSettings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCompressionSettingsInputSchema = z.object({
  compressionLevel: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The desired compression level: Low, Medium, or High.'),
  fileType: z
    .enum(['PNG', 'JPG'])
    .describe('The type of the file to be compressed: PNG or JPG.'),
});
export type SuggestCompressionSettingsInput = z.infer<
  typeof SuggestCompressionSettingsInputSchema
>;

const SuggestCompressionSettingsOutputSchema = z.object({
  quality: z
    .number()
    .describe(
      'The suggested image quality setting (0-100, where 100 is the best quality)'
    ),
  optimizationStrategy: z
    .string()
    .describe(
      'The recommended optimization strategy to balance file size and quality.'
    ),
});
export type SuggestCompressionSettingsOutput = z.infer<
  typeof SuggestCompressionSettingsOutputSchema
>;

export async function suggestCompressionSettings(
  input: SuggestCompressionSettingsInput
): Promise<SuggestCompressionSettingsOutput> {
  return suggestCompressionSettingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCompressionSettingsPrompt',
  input: {schema: SuggestCompressionSettingsInputSchema},
  output: {schema: SuggestCompressionSettingsOutputSchema},
  prompt: `You are an expert in file compression. Based on the user's selected compression level and file type, suggest the optimal compression settings to balance file size and quality.

Compression Level: {{{compressionLevel}}}
File Type: {{{fileType}}}

Consider these factors when suggesting settings:

- **Low Compression:** Prioritize image quality and detail. File size is less important.
- **Medium Compression:** Balance image quality and file size.
- **High Compression:** Prioritize file size, even if it means some loss of image quality.

For JPG files, the quality setting should be between 0 and 100, where 100 is the best quality.

Return the suggested image quality and a short explanation of the optimization strategy.`, // eslint-disable-line max-len
});

const suggestCompressionSettingsFlow = ai.defineFlow(
  {
    name: 'suggestCompressionSettingsFlow',
    inputSchema: SuggestCompressionSettingsInputSchema,
    outputSchema: SuggestCompressionSettingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    