'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a skills visualization from text.
 *
 * The flow takes text as input and returns a data URI representing the generated image.
 *  - skillsVisualizationFromText - A function that takes text as input and returns a skills visualization.
 *  - SkillsVisualizationFromTextInput - The input type for the skillsVisualizationFromText function.
 *  - SkillsVisualizationFromTextOutput - The return type for the skillsVisualizationFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsVisualizationFromTextInputSchema = z.object({
  text: z
    .string()
    .describe("Text describing the user's skills, from which the visualization will be generated."),
});
export type SkillsVisualizationFromTextInput = z.infer<
  typeof SkillsVisualizationFromTextInputSchema
>;

const SkillsVisualizationFromTextOutputSchema = z.object({
  visualizationDataUri: z
    .string()
    .describe(
      'A data URI representing the generated skills visualization image.  It must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep the backslashes for escaping single quotes
    ),
});
export type SkillsVisualizationFromTextOutput = z.infer<
  typeof SkillsVisualizationFromTextOutputSchema
>;

export async function skillsVisualizationFromText(
  input: SkillsVisualizationFromTextInput
): Promise<SkillsVisualizationFromTextOutput> {
  return skillsVisualizationFromTextFlow(input);
}

const skillsVisualizationFromTextPrompt = ai.definePrompt({
  name: 'skillsVisualizationFromTextPrompt',
  input: {schema: SkillsVisualizationFromTextInputSchema},
  output: {schema: SkillsVisualizationFromTextOutputSchema},
  prompt: `You are an AI image generator specializing in skills visualization.

  Based on the text provided, create a visually engaging and informative image that represents the user's skills.
  The image should be modern, clean, and reflect the user's professional abilities.
  Return the image as a data URI in the visualizationDataUri field. Ensure that the data URI includes a MIME type and uses Base64 encoding.

  Text: {{{text}}}
  `,
});

const skillsVisualizationFromTextFlow = ai.defineFlow(
  {
    name: 'skillsVisualizationFromTextFlow',
    inputSchema: SkillsVisualizationFromTextInputSchema,
    outputSchema: SkillsVisualizationFromTextOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a skills visualization from the following text: ${input.text}`,
    });

    return {visualizationDataUri: media.url!};
  }
);
