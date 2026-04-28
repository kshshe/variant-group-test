import { useState } from 'react';
import { toast } from 'react-toastify';

import { AppHeader } from '../../components/AppHeader/AppHeader';
import { generateCoverLetter } from '../../lib/api/generateCoverLetter';
import type { GenerateCoverLetterRequest } from '../../lib/api/types';
import {
  DocumentsStorage,
  type JobApplicationDocument,
} from '../../lib/storage/DocumentsStorage';

import styles from './styles.module.scss';
import { Text } from '../../components/base/text/Text';
import { TitleGap } from '../../components/TitleGap/TitleGap';
import { Container } from '../../components/base/container/Container';
import { Field } from '../../components/base/field/Field';
import { Button } from '../../components/base/button/Button';
import { Icon } from '../../components/base/icon/Icon';
import { ApplicationCard } from '../../components/ApplicationList/ApplicationCard/ApplicationCard';

interface CreateApplicationPageProps {
  documentsCount: number;
  onDocumentCreated: () => void;
}

const initialFormState: GenerateCoverLetterRequest = {
  jobTitle: '',
  company: '',
  strengths: '',
  additionalDetails: '',
};

export function CreateApplicationPage({
  documentsCount,
  onDocumentCreated,
}: CreateApplicationPageProps) {
  const [formState, setFormState] =
    useState<GenerateCoverLetterRequest>(initialFormState);
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

  async function handleSubmit() {
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

  const hasCustomTitle = [formState.jobTitle, formState.company].every(Boolean);
  const title = hasCustomTitle
    ? [formState.jobTitle, formState.company].join(', ')
    : 'New application';

  const previewText =
    generatedDocument?.coverLetter ??
    'Your generated cover letter will appear here after a successful request.';

  return (
    <main>
      <AppHeader documentsCount={documentsCount} />

      <div className={styles.container}>
        <section>
          <Text
            size="large"
            color={hasCustomTitle ? 'primary' : 'secondary'}
            as="h1"
          >
            {title}
          </Text>
          <TitleGap size="small" />
          <Container align="center" direction="row" gap="16px">
            <Field
              label="Job title"
              value={formState.jobTitle}
              onChange={(value) => updateField('jobTitle', value)}
              maxLength={120}
              placeholder="Product manager"
            />
            <Field
              label="Company"
              value={formState.company}
              onChange={(value) => updateField('company', value)}
              maxLength={120}
              placeholder="Apple"
            />
          </Container>
          <Field
            label="I am good at..."
            value={formState.strengths}
            onChange={(value) => updateField('strengths', value)}
            maxLength={300}
            placeholder="HTML, CSS and doing things in time"
          />
          <Field
            label="Additional details"
            value={formState.additionalDetails}
            onChange={(value) => updateField('additionalDetails', value)}
            maxLength={1200}
            placeholder="I build user-focused interfaces, communicate clearly with designers and engineers, and enjoy turning ambiguous ideas into polished product experiences."
            rows={8}
            type="textarea"
          />
          <Button size="large" fullWidth onClick={handleSubmit}>
            {loading ? (
              <Icon
                name="loader"
                size="large"
                className={styles.spinningIcon}
              />
            ) : generatedDocument ? (
              'Try Again'
            ) : (
              'Generate letter'
            )}
          </Button>
        </section>

        <ApplicationCard
          document={{
            id: 'tmp-id',
            ...formState,
            coverLetter: previewText,
            createdAt: new Date().toISOString(),
          }}
        />
      </div>
    </main>
  );
}
