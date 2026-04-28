import { Link } from 'wouter';

import { AppHeader } from '../components/AppHeader/AppHeader';
import { ApplicationList } from '../components/ApplicationList';
import { GoalBanner } from '../components/GoalBanner';
import type { JobApplicationDocument } from '../lib/storage/DocumentsStorage';

interface DashboardPageProps {
  documents: JobApplicationDocument[];
  onDelete: (documentId: string) => void;
}

export function DashboardPage({ documents, onDelete }: DashboardPageProps) {
  return (
    <main>
      <AppHeader documentsCount={documents.length} />

      <section>
        <h1>Applications</h1>
        <p>
          <Link href="/create">Create New</Link>
        </p>
      </section>

      <ApplicationList documents={documents} onDelete={onDelete} />
      <GoalBanner documentsCount={documents.length} />
    </main>
  );
}
