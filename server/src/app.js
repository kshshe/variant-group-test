import { fileURLToPath } from 'node:url';

import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { createOpenAICoverLetterService } from './services/generateCoverLetter.js';

/**
 * @typedef {Object} GenerateRequest
 * @property {string} jobTitle
 * @property {string} company
 * @property {string} strengths
 * @property {string} additionalDetails
 */

const MAX_FIELD_LENGTHS = {
  jobTitle: 120,
  company: 120,
  strengths: 300,
  additionalDetails: 1200
};

function buildSwaggerSpec() {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'PDFNet API',
        version: '1.0.0',
        description: 'Simple API for generating cover letters with OpenAI.'
      },
      servers: [
        {
          url: 'http://localhost:3001'
        }
      ]
    },
    apis: [fileURLToPath(new URL('./app.js', import.meta.url))]
  });
}

const swaggerSpec = buildSwaggerSpec();

/**
 * @param {string} code
 * @param {string} message
 * @param {string[]} [details]
 */
function createErrorResponse(code, message, details = []) {
  return {
    error: {
      code,
      message,
      ...(details.length > 0 ? { details } : {})
    }
  };
}

/**
 * @param {unknown} value
 */
function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * @param {unknown} body
 * @returns {{ ok: true, value: GenerateRequest } | { ok: false, details: string[] }}
 */
function validateGenerateRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, details: ['Request body must be a JSON object.'] };
  }

  const candidate = /** @type {Record<string, unknown>} */ (body);
  const jobTitle = normalizeText(candidate.jobTitle);
  const company = normalizeText(candidate.company);
  const strengths = normalizeText(candidate.strengths);
  const additionalDetails = normalizeText(candidate.additionalDetails);

  /** @type {string[]} */
  const details = [];

  if (!jobTitle) {
    details.push('jobTitle is required.');
  }

  if (!company) {
    details.push('company is required.');
  }

  if (!strengths) {
    details.push('strengths is required.');
  }

  if (jobTitle.length > MAX_FIELD_LENGTHS.jobTitle) {
    details.push(`jobTitle must be at most ${MAX_FIELD_LENGTHS.jobTitle} characters.`);
  }

  if (company.length > MAX_FIELD_LENGTHS.company) {
    details.push(`company must be at most ${MAX_FIELD_LENGTHS.company} characters.`);
  }

  if (strengths.length > MAX_FIELD_LENGTHS.strengths) {
    details.push(`strengths must be at most ${MAX_FIELD_LENGTHS.strengths} characters.`);
  }

  if (additionalDetails.length > MAX_FIELD_LENGTHS.additionalDetails) {
    details.push(`additionalDetails must be at most ${MAX_FIELD_LENGTHS.additionalDetails} characters.`);
  }

  if (details.length > 0) {
    return { ok: false, details };
  }

  return {
    ok: true,
    value: {
      jobTitle,
      company,
      strengths,
      additionalDetails
    }
  };
}

/**
 * Creates the Express application.
 *
 * @param {{ coverLetterService?: { generate(payload: GenerateRequest): Promise<string> } | null, clientOrigin?: string }} [options]
 */
export function createApp(options = {}) {
  const {
    coverLetterService = null,
    clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'
  } = options;

  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: false
    })
  );
  app.use(
    cors({
      origin: clientOrigin,
      methods: ['GET', 'POST']
    })
  );
  app.use(express.json({ limit: '10kb' }));

  app.use((error, _request, response, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return response
        .status(400)
        .json(createErrorResponse('INVALID_JSON', 'Request body must be valid JSON.'));
    }

    return next(error);
  });

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message: createErrorResponse('RATE_LIMITED', 'Too many requests. Try again later.')
    })
  );

  app.get('/api/docs.json', (_request, response) => {
    response.json(swaggerSpec);
  });
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

  const generateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: createErrorResponse(
      'GENERATE_RATE_LIMITED',
      'Too many generation requests. Try again in a few minutes.'
    )
  });

  const generateSlowdown = slowDown({
    windowMs: 10 * 60 * 1000,
    delayAfter: 3,
    delayMs: (hits) => Math.min((hits - 3) * 300, 1500)
  });

  /**
   * @openapi
   * /api/generate:
   *   post:
   *     summary: Generate a cover letter from the submitted form fields.
   *     tags:
   *       - Cover letters
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - jobTitle
   *               - company
   *               - strengths
   *             properties:
   *               jobTitle:
   *                 type: string
   *                 example: Product manager
   *               company:
   *                 type: string
   *                 example: Apple
   *               strengths:
   *                 type: string
   *                 example: HTML, CSS and doing things in time
   *               additionalDetails:
   *                 type: string
   *                 example: I build user-focused interfaces and ship polished experiences.
   *     responses:
   *       '200':
   *         description: Cover letter generated successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     coverLetter:
   *                       type: string
   *       '400':
   *         description: Validation error.
   *       '429':
   *         description: Rate limit exceeded.
   *       '500':
   *         description: Unexpected server error.
   */
  app.post('/api/generate', generateLimiter, generateSlowdown, async (request, response) => {
    const validation = validateGenerateRequest(request.body);

    if (!validation.ok) {
      return response
        .status(400)
        .json(createErrorResponse('VALIDATION_ERROR', 'Request body is invalid.', validation.details));
    }

    const service = coverLetterService ?? createOpenAICoverLetterService();

    try {
      const coverLetter = await service.generate(validation.value);

      return response.status(200).json({
        data: {
          coverLetter
        }
      });
    } catch (error) {
      const statusCode =
        typeof error === 'object' && error !== null && 'statusCode' in error && typeof error.statusCode === 'number'
          ? error.statusCode
          : 500;

      if (statusCode >= 500) {
        console.error(error);
      }

      if (statusCode === 503) {
        return response
          .status(503)
          .json(createErrorResponse('AI_SERVICE_UNAVAILABLE', 'OpenAI API key is not configured.'));
      }

      if (statusCode === 504) {
        return response
          .status(504)
          .json(createErrorResponse('AI_TIMEOUT', 'The AI provider took too long to respond.'));
      }

      return response
        .status(statusCode >= 400 && statusCode < 600 ? statusCode : 500)
        .json(createErrorResponse('GENERATION_FAILED', 'Failed to generate a cover letter.'));
    }
  });

  return app;
}
