import type { JobApplicationDocument } from '../../lib/storage/DocumentsStorage';

import { ApplicationCard } from './ApplicationCard/ApplicationCard';
import styles from './styles.module.scss';

interface ApplicationListProps {
  documents: JobApplicationDocument[];
  onDelete: (documentId: string) => void;
}

export function ApplicationList({ documents, onDelete }: ApplicationListProps) {
  if (documents.length === 0) {
    return (
      <section>
        <h2>No applications yet</h2>
        <p>
          Generate your first cover letter to populate the dashboard. Drafts
          will be restored from this browser automatically.
        </p>
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
        />
      ))}
    </section>
  );
}
