import { type FormEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { generateCoverLetter } from '../../lib/api/generateCoverLetter';
import type { GenerateCoverLetterRequest } from '../../lib/api/types';
import {
  DocumentsStorage,
  type JobApplicationDocument,
} from '../../lib/storage/DocumentsStorage';
import {
  COVER_LETTER_FIELD_MAX_LENGTHS,
  coverLetterFieldRules,
  normalizeGenerateCoverLetterRequest,
} from '../../lib/validation/generateCoverLetterValidation';
import { useFormField } from '../../hooks/useFormField';

import { ApplicationCard } from '../ApplicationCard/ApplicationCard';
import { TitleGap } from '../TitleGap/TitleGap';
import { Button } from '../base/button/Button';
import { Container } from '../base/container/Container';
import { Field } from '../base/field/Field';
import { Icon } from '../base/icon/Icon';
import { Text } from '../base/text/Text';
import { CreateApplicationLoader } from '../CreateApplicationLoader/CreateApplicationLoader';

import styles from './styles.module.scss';

interface CreateApplicationFormProps {
  onDocumentCreated: () => void;
}

const validateOnChange = true;

export function CreateApplicationForm({
  onDocumentCreated,
}: CreateApplicationFormProps) {
  const jobTitleField = useFormField({
    rules: coverLetterFieldRules.jobTitle.client,
    validateOnChange,
  });
  const companyField = useFormField({
    rules: coverLetterFieldRules.company.client,
    validateOnChange,
  });
  const strengthsField = useFormField({
    rules: coverLetterFieldRules.strengths.client,
    validateOnChange,
  });
  const additionalDetailsField = useFormField({
    rules: coverLetterFieldRules.additionalDetails.client,
    validateOnChange,
  });
  const [loading, setLoading] = useState(false);
  const [generatedDocument, setGeneratedDocument] =
    useState<JobApplicationDocument | null>(null);

  const formState: GenerateCoverLetterRequest = {
    jobTitle: jobTitleField.value,
    company: companyField.value,
    strengths: strengthsField.value,
    additionalDetails: additionalDetailsField.value,
  };

  async function handleSubmit() {
    if (loading) {
      return;
    }

    const validationResults = [
      jobTitleField.validate(),
      companyField.validate(),
      strengthsField.validate(),
      additionalDetailsField.validate(),
    ];

    if (validationResults.some((isValid) => !isValid)) {
      return;
    }

    const normalizedFormState = normalizeGenerateCoverLetterRequest(formState);

    setLoading(true);

    try {
      const { coverLetter } = await generateCoverLetter(normalizedFormState);
      const document: JobApplicationDocument = {
        id: crypto.randomUUID(),
        ...normalizedFormState,
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

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleSubmit();
  }

  const trimmedJobTitle = jobTitleField.value.trim();
  const trimmedCompany = companyField.value.trim();
  const hasCustomTitle = [trimmedJobTitle, trimmedCompany].every(Boolean);
  const title = hasCustomTitle
    ? [trimmedJobTitle, trimmedCompany].join(', ')
    : 'New application';

  const previewText =
    generatedDocument?.coverLetter ??
    'Your generated cover letter will appear here after a successful request.';

  const isEnoughDataToSubmit = useMemo(() => {
    return [
      jobTitleField.value.trim().length > 0,
      companyField.value.trim().length > 0,
      strengthsField.value.trim().length > 0,
    ].every(Boolean);
  }, [jobTitleField.value, companyField.value, strengthsField.value]);

  return (
    <div className={styles.container}>
      <section>
        <Text
          size="large"
          color={hasCustomTitle ? 'primary' : 'secondary'}
          as="h1"
          className={styles.title}
        >
          {title}
        </Text>
        <TitleGap size="small" />
        <form onSubmit={handleFormSubmit}>
          <Container align="start" direction="row" gap="16px">
            <Field
              label="Job title"
              bottomLabel={
                jobTitleField.isTouched
                  ? (jobTitleField.error ?? undefined)
                  : undefined
              }
              error={jobTitleField.isTouched && Boolean(jobTitleField.error)}
              maxLength={COVER_LETTER_FIELD_MAX_LENGTHS.jobTitle}
              placeholder="Product manager"
              {...jobTitleField.inputProps}
            />
            <Field
              label="Company"
              bottomLabel={
                companyField.isTouched
                  ? (companyField.error ?? undefined)
                  : undefined
              }
              error={companyField.isTouched && Boolean(companyField.error)}
              maxLength={COVER_LETTER_FIELD_MAX_LENGTHS.company}
              placeholder="Apple"
              {...companyField.inputProps}
            />
          </Container>
          <Field
            label="I am good at..."
            bottomLabel={
              strengthsField.isTouched
                ? (strengthsField.error ?? undefined)
                : undefined
            }
            error={strengthsField.isTouched && Boolean(strengthsField.error)}
            maxLength={COVER_LETTER_FIELD_MAX_LENGTHS.strengths}
            placeholder="HTML, CSS and doing things in time"
            {...strengthsField.inputProps}
          />
          <Field
            label="Additional details"
            bottomLabel={`${additionalDetailsField.value.length}/${COVER_LETTER_FIELD_MAX_LENGTHS.additionalDetails}`}
            error={
              additionalDetailsField.isTouched &&
              Boolean(additionalDetailsField.error)
            }
            placeholder="I build user-focused interfaces, communicate clearly with designers and engineers, and enjoy turning ambiguous ideas into polished product experiences."
            rows={8}
            type="textarea"
            {...additionalDetailsField.inputProps}
          />
          <Button
            type="submit"
            size="large"
            fullWidth
            color={generatedDocument ? 'secondary' : 'primary'}
            disabled={!isEnoughDataToSubmit}
            aria-busy={loading}
          >
            {loading && (
              <Icon
                name="loader"
                size="large"
                className={styles.spinningIcon}
              />
            )}
            {!loading &&
              (generatedDocument ? (
                <>
                  <Icon name="repeat" />
                  Try Again
                </>
              ) : (
                <>Generate Now</>
              ))}
          </Button>
        </form>
      </section>

      {!loading && (
        <ApplicationCard
          document={{
            id: 'tmp-id',
            ...formState,
            coverLetter: previewText,
            createdAt: new Date().toISOString(),
          }}
        />
      )}

      {loading && <CreateApplicationLoader />}
    </div>
  );
}
