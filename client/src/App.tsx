import { useCallback, useMemo, useState } from 'react';
import { Route, Switch } from 'wouter';
import { ToastContainer } from 'react-toastify';

import { DocumentsStorage, type JobApplicationDocument } from './lib/storage/DocumentsStorage';
import { CreateApplicationPage } from './pages/CreateApplicationPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const storage = useMemo(() => new DocumentsStorage(), []);
  const [documents, setDocuments] = useState<JobApplicationDocument[]>(() => storage.getAll());

  const refreshDocuments = useCallback(() => {
    setDocuments(storage.getAll());
  }, [storage]);

  const handleDelete = useCallback(
    (documentId: string) => {
      storage.delete(documentId);
      refreshDocuments();
    },
    [refreshDocuments, storage]
  );

  return (
    <>
      <Switch>
        <Route path="/">
          <DashboardPage documents={documents} onDelete={handleDelete} />
        </Route>
        <Route path="/create">
          <CreateApplicationPage documentsCount={documents.length} onDocumentCreated={refreshDocuments} />
        </Route>
      </Switch>
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} />
    </>
  );
}
