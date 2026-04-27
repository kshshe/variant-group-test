import type { MouseEvent } from 'react';

import type { JobApplicationDocument } from '../lib/storage/DocumentsStorage';

interface ApplicationCardProps {
  document: JobApplicationDocument;
  onDelete: (documentId: string) => void;
}

function formatCreatedAt(createdAt: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(createdAt));
}

export function ApplicationCard({ document, onDelete }: ApplicationCardProps) {
  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await navigator.clipboard.writeText(document.coverLetter);
  }

  return (
    <article>
      <p>
        <strong>{document.jobTitle}</strong> — {document.company} —{' '}
        {formatCreatedAt(document.createdAt)}
      </p>
      <p>Dear {document.company} team,</p>
      <p>{document.coverLetter}</p>
      <div>
        <button type="button" onClick={() => onDelete(document.id)}>
          Delete
        </button>
        <button type="button" onClick={handleCopy}>
          Copy to clipboard
        </button>
      </div>
    </article>
  );
}
