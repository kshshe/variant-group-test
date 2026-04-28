import OpenAI from 'openai';

import {
  buildCoverLetterPrompt,
  COVER_LETTER_SYSTEM_INSTRUCTIONS,
  type GenerateRequest,
} from '../prompts/coverLetterPrompt.js';

export interface CoverLetterService {
  generate(payload: GenerateRequest): Promise<string>;
}

export interface OpenAICoverLetterServiceOptions {
  apiKey?: string;
  model?: string;
  timeoutMs?: number;
}

type ErrorWithStatusCode = Error & { statusCode?: number };

function createStatusError(
  message: string,
  statusCode: number,
): ErrorWithStatusCode {
  const error = new Error(message) as ErrorWithStatusCode;
  error.statusCode = statusCode;
  return error;
}

export function createOpenAICoverLetterService(
  options: OpenAICoverLetterServiceOptions = {},
): CoverLetterService {
  const {
    apiKey = process.env.OPENAI_API_KEY,
    model = process.env.OPENAI_MODEL ?? 'gpt-5.4',
    timeoutMs = 20_000,
  } = options;

  let client: OpenAI | null = null;

  function getClient(): OpenAI {
    if (!apiKey) {
      throw createStatusError('OPENAI_API_KEY is not configured.', 503);
    }

    if (!client) {
      client = new OpenAI({ apiKey });
    }

    return client;
  }

  return {
    async generate(payload: GenerateRequest): Promise<string> {
      try {
        const response = await getClient().responses.create(
          {
            model,
            instructions: COVER_LETTER_SYSTEM_INSTRUCTIONS,
            tools: [
              // @ts-expect-error - web_search is not a valid tool type
              { type: 'web_search' },
            ],
            input: buildCoverLetterPrompt(payload),
            max_output_tokens: 1100,
            temperature: 0.8,
          },
          {
            signal: AbortSignal.timeout(timeoutMs),
          },
        );

        const text = response.output_text?.trim();

        if (!text) {
          throw createStatusError('LLM returned an empty response.', 502);
        }

        return text;
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw createStatusError('The AI provider timed out.', 504);
        }

        throw error;
      }
    },
  };
}
