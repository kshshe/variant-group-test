export type { GenerateCoverLetterRequest } from '../validation/generateCoverLetterValidation';

export interface GenerateCoverLetterResponse {
  data: {
    coverLetter: string;
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: string[];
  };
}
