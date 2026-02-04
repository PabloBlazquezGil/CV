'use server';

/**
 * @fileOverview Analyzes a CV against a job description and provides feedback.
 *
 * - analyzeCvAndProvideFeedback - A function that analyzes the CV and provides feedback.
 * - CVAnalysisAndFeedbackInput - The input type for the analyzeCvAndProvideFeedback function.
 * - CVAnalysisAndFeedbackOutput - The return type for the analyzeCvAndFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CVAnalysisAndFeedbackInputSchema = z.object({
  cvText: z.string().describe('The text content of the CV.'),
  jobDescription: z.string().describe('The job description to tailor the CV towards.'),
});
export type CVAnalysisAndFeedbackInput = z.infer<typeof CVAnalysisAndFeedbackInputSchema>;

const CVAnalysisAndFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Feedback on how to tailor the CV to better align with the job description.'),
});
export type CVAnalysisAndFeedbackOutput = z.infer<typeof CVAnalysisAndFeedbackOutputSchema>;

export async function analyzeCvAndProvideFeedback(input: CVAnalysisAndFeedbackInput): Promise<CVAnalysisAndFeedbackOutput> {
  return analyzeCvAndProvideFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cvAnalysisAndFeedbackPrompt',
  input: {schema: CVAnalysisAndFeedbackInputSchema},
  output: {schema: CVAnalysisAndFeedbackOutputSchema},
  prompt: `You are an expert career coach. You will analyze a CV and provide feedback on how to tailor it to better align with a job description.

CV:
{{cvText}}

Job Description:
{{jobDescription}}

Provide specific and actionable feedback on how to improve the CV to match the job description. Focus on skills, experience, and keywords that should be emphasized or added. Also, provide feedback on the general structure and organization of the CV, making suggestions on how to tailor it to be more appealing to the potential employer. Be direct, be concise, and be helpful.
`,
});

const analyzeCvAndProvideFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeCvAndProvideFeedbackFlow',
    inputSchema: CVAnalysisAndFeedbackInputSchema,
    outputSchema: CVAnalysisAndFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
