import type {
  ApiErrorResponse,
  GenerateCoverLetterRequest,
  GenerateCoverLetterResponse,
} from './types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? '';
const RETRY_DELAYS_MS = [150, 300, 600];

class RequestError extends Error {
  retriable: boolean;

  constructor(message: string, retriable: boolean) {
    super(message);
    this.name = 'RequestError';
    this.retriable = retriable;
  }
}

function isRetriableStatus(status: number) {
  return status >= 500;
}

function wait(durationMs: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

async function parseErrorMessage(response: Response) {
  try {
    const body = (await response.json()) as ApiErrorResponse;

    if (body?.error?.message) {
      return body.error.details?.length
        ? `${body.error.message} ${body.error.details.join(' ')}`
        : body.error.message;
    }
  } catch {
    // Ignore JSON parse failures and use the fallback below.
  }

  return `Request failed with status ${response.status}.`;
}

async function requestJson<TResponse>(
  path: string,
  init: RequestInit,
): Promise<TResponse> {
  let lastError: Error | null = null;

  for (
    let attemptIndex = 0;
    attemptIndex <= RETRY_DELAYS_MS.length;
    attemptIndex += 1
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, init);

      if (!response.ok) {
        throw new RequestError(
          await parseErrorMessage(response),
          isRetriableStatus(response.status) &&
            attemptIndex < RETRY_DELAYS_MS.length,
        );
      }

      return (await response.json()) as TResponse;
    } catch (error) {
      if (error instanceof RequestError && !error.retriable) {
        throw error;
      }

      lastError =
        error instanceof Error ? error : new Error('Network request failed.');

      if (attemptIndex < RETRY_DELAYS_MS.length) {
        await wait(RETRY_DELAYS_MS[attemptIndex]);
        continue;
      }
    }
  }

  throw lastError ?? new Error('Unexpected request failure.');
}

export async function generateCoverLetter(payload: GenerateCoverLetterRequest) {
  const response = await requestJson<GenerateCoverLetterResponse>(
    '/api/generate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}
