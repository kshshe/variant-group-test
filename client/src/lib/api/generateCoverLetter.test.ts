import { afterEach, describe, expect, it, vi } from 'vitest';

import { generateCoverLetter } from './generateCoverLetter';

const payload = {
  jobTitle: 'Product manager',
  company: 'Apple',
  strengths: 'HTML, CSS and doing things in time',
  additionalDetails: 'Ships polished UX'
};

describe('generateCoverLetter', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('retries transient failures up to three times and resolves with response data', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 502 }))
      .mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockResolvedValueOnce(new Response(null, { status: 502 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: {
              coverLetter: 'Dear Apple Team, thank you for considering my application.'
            }
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      );

    vi.stubGlobal('fetch', fetchMock);

    const result = await generateCoverLetter(payload);

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(result.coverLetter).toContain('Dear Apple Team');
  });
});
