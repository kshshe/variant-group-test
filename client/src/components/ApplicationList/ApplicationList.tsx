import type { JobApplicationDocument } from '../../lib/storage/DocumentsStorage';

import { useLocation } from 'wouter';
import { ApplicationCard } from '../ApplicationCard/ApplicationCard';
import { Button } from '../base/button/Button';
import { Icon } from '../base/icon/Icon';
import { Text } from '../base/text/Text';
import styles from './styles.module.scss';

interface ApplicationListProps {
  documents: JobApplicationDocument[];
  onDelete: (documentId: string) => void;
}

export function ApplicationList({ documents, onDelete }: ApplicationListProps) {
  const [, navigate] = useLocation();

  if (documents.length === 0) {
    return (
      <section className={styles.empty}>
        <Text
          size="large"
          color="primary"
          as="h2"
          className={styles.emptyTitle}
        >
          No applications yet
        </Text>
        <Text
          size="regular"
          color="secondary"
          as="p"
          className={styles.emptyDescription}
        >
          Tailoring your cover letters can increase your chances of getting
          hired by up to 30%.
        </Text>
        <Button
          size="medium"
          color="secondary"
          onClick={() => navigate('/create')}
        >
          <Icon name="plus" />
          Create New
        </Button>
      </section>
    );
  }

  return (
    <section className={styles.grid}>
      {documents.map((document) => (
        <ApplicationCard
          key={document.id}
          document={document}
          onDelete={onDelete}
          limitHeight
        />
      ))}
    </section>
  );
}
