export interface GenerateCoverLetterRequest {
  jobTitle: string;
  company: string;
  strengths: string;
  additionalDetails: string;
}

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
