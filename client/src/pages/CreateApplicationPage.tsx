import { useState, type FormEvent } from 'react';
import { Link } from 'wouter';
import { toast } from 'react-toastify';

import { AppHeader } from '../components/AppHeader/AppHeader';
import { GoalBanner } from '../components/GoalBanner';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { generateCoverLetter } from '../lib/api/generateCoverLetter';
import type { GenerateCoverLetterRequest } from '../lib/api/types';
import {
  DocumentsStorage,
  type JobApplicationDocument,
} from '../lib/storage/DocumentsStorage';

interface CreateApplicationPageProps {
  documentsCount: number;
  onDocumentCreated: () => void;
}

const initialFormState: GenerateCoverLetterRequest = {
  jobTitle: 'Product manager',
  company: 'Apple',
  strengths: 'HTML, CSS and doing things in time',
  additionalDetails:
    'I build user-focused interfaces, communicate clearly with designers and engineers, and enjoy turning ambiguous ideas into polished product experiences.',
};

export function CreateApplicationPage({
  documentsCount,
  onDocumentCreated,
}: CreateApplicationPageProps) {
  const [formState, setFormState] =
    useLocalStorageState<GenerateCoverLetterRequest>(
      'pdfnet-form-draft',
      initialFormState,
    );
  const [loading, setLoading] = useState(false);
  const [generatedDocument, setGeneratedDocument] =
    useState<JobApplicationDocument | null>(null);

  function updateField<Key extends keyof GenerateCoverLetterRequest>(
    key: Key,
    value: GenerateCoverLetterRequest[Key],
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const { coverLetter } = await generateCoverLetter(formState);
      const document: JobApplicationDocument = {
        id: crypto.randomUUID(),
        ...formState,
        coverLetter,
        createdAt: new Date().toISOString(),
      };

      DocumentsStorage.add(document);
      setGeneratedDocument(document);
      onDocumentCreated();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to generate cover letter.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!generatedDocument) {
      return;
    }

    await navigator.clipboard.writeText(generatedDocument.coverLetter);
  }

  const title =
    [formState.jobTitle, formState.company].filter(Boolean).join(', ') ||
    'New application';
  const previewText =
    generatedDocument?.coverLetter ??
    'Your generated cover letter will appear here after a successful request.';

  return (
    <main>
      <AppHeader documentsCount={documentsCount} />

      <section>
        <h1>{title}</h1>
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <span>Job title</span>
              <input
                value={formState.jobTitle}
                onChange={(event) =>
                  updateField('jobTitle', event.target.value)
                }
                maxLength={120}
              />
            </label>
          </div>

          <div>
            <label>
              <span>Company</span>
              <input
                value={formState.company}
                onChange={(event) => updateField('company', event.target.value)}
                maxLength={120}
              />
            </label>
          </div>

          <div>
            <label>
              <span>I am good at...</span>
              <input
                value={formState.strengths}
                onChange={(event) =>
                  updateField('strengths', event.target.value)
                }
                maxLength={300}
              />
            </label>
          </div>

          <div>
            <label>
              <span>Additional details</span>
              <textarea
                value={formState.additionalDetails}
                onChange={(event) =>
                  updateField('additionalDetails', event.target.value)
                }
                maxLength={1200}
                rows={8}
              />
            </label>
            <p>{formState.additionalDetails.length}/1200</p>
          </div>

          <div>
            <button type="submit" disabled={loading}>
              {loading
                ? 'Generating…'
                : generatedDocument
                  ? 'Try Again'
                  : 'Generate letter'}
            </button>
            <Link href="/">Back to applications</Link>
          </div>
        </form>

        <section>
          <h2>Generated cover letter</h2>
          {loading ? (
            <p>Generating your cover letter…</p>
          ) : (
            <pre>{previewText}</pre>
          )}
          <div>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!generatedDocument}
            >
              Copy to clipboard
            </button>
          </div>
        </section>
      </section>

      <GoalBanner documentsCount={documentsCount} />
    </main>
  );
}
