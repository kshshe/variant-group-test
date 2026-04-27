import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';

import { createApp } from '../src/app.js';

const validPayload = {
  jobTitle: 'Product manager',
  company: 'Apple',
  strengths: 'HTML, CSS and doing things in time',
  additionalDetails: 'I build user-focused interfaces and ship polished experiences.'
};

test('POST /api/generate validates the request body', async () => {
  const app = createApp({
    coverLetterService: {
      async generate() {
        return 'should not be called';
      }
    }
  });

  const response = await request(app)
    .post('/api/generate')
    .send({ company: 'Apple' });

  assert.equal(response.status, 400);
  assert.equal(response.body.error.code, 'VALIDATION_ERROR');
});

test('POST /api/generate returns a generated cover letter', async () => {
  let receivedPayload = null;

  const app = createApp({
    coverLetterService: {
      async generate(payload) {
        receivedPayload = payload;
        return `Dear Apple Team,\n\nThank you for considering my application.`;
      }
    }
  });

  const response = await request(app)
    .post('/api/generate')
    .send(validPayload);

  assert.equal(response.status, 200);
  assert.equal(response.body.data.coverLetter.includes('Dear Apple Team'), true);
  assert.deepEqual(receivedPayload, validPayload);
});
