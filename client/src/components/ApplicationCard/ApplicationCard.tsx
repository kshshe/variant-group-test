import type { MouseEvent } from 'react';

import type { JobApplicationDocument } from '../../lib/storage/DocumentsStorage';

import styles from './styles.module.scss';
import { Text } from '../base/text/Text';
import { Container } from '../base/container/Container';
import { TextButton } from '../base/text-button/TextButton';
import { Icon } from '../base/icon/Icon';
import { toast } from 'react-toastify';
import classNames from 'classnames';

interface ApplicationCardProps {
  document: JobApplicationDocument;
  onDelete?: (documentId: string) => void;
  limitHeight?: boolean;
}

const useSplittedText = (text: string) => {
  return text.split('\n');
};

export function ApplicationCard({
  document,
  onDelete,
  limitHeight,
}: ApplicationCardProps) {
  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await navigator.clipboard.writeText(document.coverLetter);
    toast.success('Cover letter copied to clipboard');
  }

  const splittedText = useSplittedText(document.coverLetter);

  return (
    <article className={styles.card}>
      <div
        className={classNames(styles.content, {
          [styles.limitedHeight]: limitHeight,
        })}
      >
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
        {onDelete && (
          <TextButton color="secondary" onClick={() => onDelete(document.id)}>
            <Icon name="trash" />
            Delete
          </TextButton>
        )}
        {!onDelete && <span />}
        <TextButton onClick={handleCopy}>
          Copy to clipboard
          <Icon name="copy" />
        </TextButton>
      </Container>
    </article>
  );
}
