export interface GenerateCoverLetterRequest {
  jobTitle: string;
  company: string;
  strengths: string;
  additionalDetails: string;
}

export type FormFieldRule = {
  validate: (value: string) => boolean;
  message: string;
};

type FieldName = keyof GenerateCoverLetterRequest;

type FieldRules = {
  client: FormFieldRule[];
  server: FormFieldRule[];
};

type ValidationSuccess = {
  valid: true;
  value: GenerateCoverLetterRequest;
};

type ValidationFailure = {
  valid: false;
  errors: string[];
};

export type GenerateCoverLetterValidationResult =
  | ValidationSuccess
  | ValidationFailure;

const FIELD_NAMES = [
  'jobTitle',
  'company',
  'strengths',
  'additionalDetails',
] as const satisfies readonly FieldName[];

export const COVER_LETTER_FIELD_MAX_LENGTHS: Record<FieldName, number> = {
  jobTitle: 120,
  company: 120,
  strengths: 300,
  additionalDetails: 1200,
};

function normalizeFieldValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function createRequiredRule(message: string): FormFieldRule {
  return {
    validate: (value) => value.length > 0,
    message,
  };
}

function createMaxLengthRule(
  maxLength: number,
  message: string,
): FormFieldRule {
  return {
    validate: (value) => value.length <= maxLength,
    message,
  };
}

export const coverLetterFieldRules: Record<FieldName, FieldRules> = {
  jobTitle: {
    client: [
      createRequiredRule('Job title is required.'),
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.jobTitle,
        `Job title must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.jobTitle} characters.`,
      ),
    ],
    server: [
      createRequiredRule('jobTitle is required.'),
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.jobTitle,
        `jobTitle must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.jobTitle} characters.`,
      ),
    ],
  },
  company: {
    client: [
      createRequiredRule('Company is required.'),
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.company,
        `Company must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.company} characters.`,
      ),
    ],
    server: [
      createRequiredRule('company is required.'),
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.company,
        `company must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.company} characters.`,
      ),
    ],
  },
  strengths: {
    client: [
      createRequiredRule('I am good at... is required.'),
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.strengths,
        `I am good at... must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.strengths} characters.`,
      ),
    ],
    server: [
      createRequiredRule('strengths is required.'),
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.strengths,
        `strengths must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.strengths} characters.`,
      ),
    ],
  },
  additionalDetails: {
    client: [
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.additionalDetails,
        `Additional details must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.additionalDetails} characters.`,
      ),
    ],
    server: [
      createMaxLengthRule(
        COVER_LETTER_FIELD_MAX_LENGTHS.additionalDetails,
        `additionalDetails must be at most ${COVER_LETTER_FIELD_MAX_LENGTHS.additionalDetails} characters.`,
      ),
    ],
  },
};

export function normalizeGenerateCoverLetterRequest(
  input: Partial<Record<FieldName, unknown>>,
): GenerateCoverLetterRequest {
  return {
    jobTitle: normalizeFieldValue(input.jobTitle),
    company: normalizeFieldValue(input.company),
    strengths: normalizeFieldValue(input.strengths),
    additionalDetails: normalizeFieldValue(input.additionalDetails),
  };
}

export function validateGenerateCoverLetterRequest(
  input: unknown,
): GenerateCoverLetterValidationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      valid: false,
      errors: ['Request body must be a JSON object.'],
    };
  }

  const normalizedValue = normalizeGenerateCoverLetterRequest(
    input as Partial<Record<FieldName, unknown>>,
  );
  const errors: string[] = [];

  for (const fieldName of FIELD_NAMES) {
    const value = normalizedValue[fieldName];

    for (const rule of coverLetterFieldRules[fieldName].server) {
      if (!rule.validate(value)) {
        errors.push(rule.message);
      }
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  return {
    valid: true,
    value: normalizedValue,
  };
}
