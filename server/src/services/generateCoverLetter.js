import OpenAI from 'openai';

import { buildCoverLetterPrompt, COVER_LETTER_SYSTEM_INSTRUCTIONS } from '../prompts/coverLetterPrompt.js';

/**
 * @typedef {import('../prompts/coverLetterPrompt.js').GenerateRequest} GenerateRequest
 */

/**
 * Creates a cover-letter generation service backed by OpenAI.
 *
 * @param {{ apiKey?: string, model?: string, timeoutMs?: number }} [options]
 */
export function createOpenAICoverLetterService(options = {}) {
  const {
    apiKey = process.env.OPENAI_API_KEY,
    model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
    timeoutMs = 20_000
  } = options;

  /** @type {OpenAI | null} */
  let client = null;

  function getClient() {
    if (!apiKey) {
      const error = new Error('OPENAI_API_KEY is not configured.');
      error.statusCode = 503;
      throw error;
    }

    if (!client) {
      client = new OpenAI({ apiKey });
    }

    return client;
  }

  return {
    /**
     * Generates a cover letter with the configured LLM.
     *
     * @param {GenerateRequest} payload
     * @returns {Promise<string>}
     */
    async generate(payload) {
      try {
        const response = await getClient().responses.create(
          {
            model,
            instructions: COVER_LETTER_SYSTEM_INSTRUCTIONS,
            input: buildCoverLetterPrompt(payload),
            max_output_tokens: 550,
            temperature: 0.8
          },
          {
            signal: AbortSignal.timeout(timeoutMs)
          }
        );

        const text = response.output_text?.trim();

        if (!text) {
          const error = new Error('LLM returned an empty response.');
          error.statusCode = 502;
          throw error;
        }

        return text;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          const timeoutError = new Error('The AI provider timed out.');
          timeoutError.statusCode = 504;
          throw timeoutError;
        }

        throw error;
      }
    }
  };
}
