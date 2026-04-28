import type { MouseEvent } from 'react';

import type { JobApplicationDocument } from '../../../lib/storage/DocumentsStorage';

import styles from './styles.module.scss';
import { Text } from '../../base/text/Text';
import { Container } from '../../base/container/Container';
import { TextButton } from '../../base/text-button/TextButton';
import { Icon } from '../../base/icon/Icon';

interface ApplicationCardProps {
  document: JobApplicationDocument;
  onDelete: (documentId: string) => void;
}

const useSplittedText = (text: string) => {
  return text.split('\n');
};

export function ApplicationCard({ document, onDelete }: ApplicationCardProps) {
  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await navigator.clipboard.writeText(document.coverLetter);
  }

  const splittedText = useSplittedText(document.coverLetter);

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        {splittedText.map((line, index) => (
          <Text
            key={index}
            size="regular"
            color="secondary"
            as="p"
            className={styles.textParagraph}
          >
            {line}
          </Text>
        ))}
      </div>
      <Container justify="between" align="center" direction="row" gap="16px">
        <TextButton color="secondary" onClick={() => onDelete(document.id)}>
          <Icon name="trash" />
          Delete
        </TextButton>
        <TextButton onClick={handleCopy}>
          Copy to clipboard
          <Icon name="copy" />
        </TextButton>
      </Container>
    </article>
  );
}
