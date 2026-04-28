import { AppHeader } from '../../components/AppHeader/AppHeader';
import { CreateApplicationForm } from '../../components/CreateApplicationForm/CreateApplicationForm';

interface CreateApplicationPageProps {
  documentsCount: number;
  onDocumentCreated: () => void;
}

export function CreateApplicationPage({
  documentsCount,
  onDocumentCreated,
}: CreateApplicationPageProps) {
  return (
    <main>
      <AppHeader documentsCount={documentsCount} />
      <CreateApplicationForm onDocumentCreated={onDocumentCreated} />
    </main>
  );
}
