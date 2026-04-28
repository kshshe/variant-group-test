import assert from 'node:assert/strict';
import test from 'node:test';

import {
  normalizeGenerateCoverLetterRequest,
  validateGenerateCoverLetterRequest,
} from '../src/shared/coverLetterValidation.js';

test('normalizeGenerateCoverLetterRequest trims all fields', () => {
  const normalized = normalizeGenerateCoverLetterRequest({
    jobTitle: '  Product manager  ',
    company: '  Apple  ',
    strengths: '  React and TypeScript  ',
    additionalDetails: '  Ships polished UX  ',
  });

  assert.deepEqual(normalized, {
    jobTitle: 'Product manager',
    company: 'Apple',
    strengths: 'React and TypeScript',
    additionalDetails: 'Ships polished UX',
  });
});

test('validateGenerateCoverLetterRequest returns normalized payload', () => {
  const validation = validateGenerateCoverLetterRequest({
    jobTitle: '  Product manager  ',
    company: '  Apple  ',
    strengths: '  React and TypeScript  ',
    additionalDetails: '  Ships polished UX  ',
  });

  assert.equal(validation.valid, true);

  if (!validation.valid) {
    return;
  }

  assert.deepEqual(validation.value, {
    jobTitle: 'Product manager',
    company: 'Apple',
    strengths: 'React and TypeScript',
    additionalDetails: 'Ships polished UX',
  });
});
