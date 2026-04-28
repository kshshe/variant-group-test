import type { GenerateCoverLetterRequest } from '../shared/coverLetterValidation.js';

export type GenerateRequest = GenerateCoverLetterRequest;

export const COVER_LETTER_SYSTEM_INSTRUCTIONS = [
  'You are a senior recruiting assistant.',
  'Write concise, specific cover letters in plain text.',
  'Avoid markdown, bullet points, and placeholders.',
  'Keep the tone confident, professional, and human.',
  'Use only information provided by the user and do not invent achievements.',
  'Use the web_search tool to get the latest information about the company and the job title.',
  'Use the search results only if they are relevant to the job title and the company.',
].join(' ');

export function buildCoverLetterPrompt(payload: GenerateRequest): string {
  return [
    'Create a tailored cover letter for a job application.',
    '',
    `Job title: ${payload.jobTitle}`,
    `Company: ${payload.company}`,
    `Strengths: ${payload.strengths}`,
    `Additional details: ${payload.additionalDetails || 'None provided.'}`,
    '',
    'Constraints:',
    '- Keep it between 180 and 260 words.',
    '- Start with a greeting that references the company.',
    '- Highlight the candidate strengths naturally.',
    '- End with a short call to action.',
    '- Return plain text only.',
  ].join('\n');
}
