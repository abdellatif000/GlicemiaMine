// src/ai/flows/suggest-dosage.ts
'use server';

/**
 * @fileOverview Analyzes historical blood glucose data and suggests potential Novorapide dosage adjustments.
 *
 * - suggestDosage - A function that handles the dosage suggestion process.
 * - SuggestDosageInput - The input type for the suggestDosage function.
 * - SuggestDosageOutput - The return type for the suggestDosage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDosageInputSchema = z.object({
  glucoseData: z.array(
    z.object({
      date: z.string().describe('Date of the measurement (YYYY-MM-DD).'),
      time: z.string().describe('Time of the measurement (HH:MM).'),
      mealType: z.string().describe('Type of meal (e.g., breakfast, lunch, dinner, snack).'),
      glycemia: z.number().describe('Blood glucose level in g/L.'),
      novorapidDosage: z.number().describe('Novorapid dosage in units.'),
    })
  ).describe('Historical blood glucose data.'),
});
export type SuggestDosageInput = z.infer<typeof SuggestDosageInputSchema>;

const SuggestDosageOutputSchema = z.object({
  suggestion: z.string().describe('Suggested adjustment to Novorapid dosage and the rationale behind it.'),
});
export type SuggestDosageOutput = z.infer<typeof SuggestDosageOutputSchema>;

export async function suggestDosage(input: SuggestDosageInput): Promise<SuggestDosageOutput> {
  return suggestDosageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDosagePrompt',
  input: {schema: SuggestDosageInputSchema},
  output: {schema: SuggestDosageOutputSchema},
  prompt: `You are an experienced diabetes educator. Analyze the provided historical blood glucose data and suggest potential adjustments to the Novorapid dosage to better manage blood sugar levels. Provide a clear rationale for your suggestion.

Historical Data (add a brief commentary like 'This is a high reading' or 'This is a low reading' if the glucose level is significantly outside the normal range):
{{#each glucoseData}}
  Date: {{date}}, Time: {{time}}, Meal: {{mealType}}, Glucose: {{glycemia}} g/L, Novorapid: {{novorapidDosage}} units
{{/each}}

Suggestion:`,
});

const suggestDosageFlow = ai.defineFlow(
  {
    name: 'suggestDosageFlow',
    inputSchema: SuggestDosageInputSchema,
    outputSchema: SuggestDosageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
