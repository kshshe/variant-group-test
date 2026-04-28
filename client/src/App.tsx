import { useCallback, useState } from 'react';
import { Route, Switch } from 'wouter';
import { ToastContainer } from 'react-toastify';

import {
  DocumentsStorage,
  type JobApplicationDocument,
} from './lib/storage/DocumentsStorage';
import { CreateApplicationPage } from './pages/CreateApplicationPage/CreateApplicationPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { Page } from './components/Page/Page';

import './components/base/global.scss';

export default function App() {
  const [documents, setDocuments] = useState<JobApplicationDocument[]>(() =>
    DocumentsStorage.getAll(),
  );

  const refreshDocuments = useCallback(() => {
    setDocuments(DocumentsStorage.getAll());
  }, []);

  const handleDelete = useCallback(
    (documentId: string) => {
      DocumentsStorage.delete(documentId);
      refreshDocuments();
    },
    [refreshDocuments],
  );

  return (
    <Page>
      <Switch>
        <Route path="/">
          <DashboardPage documents={documents} onDelete={handleDelete} />
        </Route>
        <Route path="/create">
          <CreateApplicationPage
            documentsCount={documents.length}
            onDocumentCreated={refreshDocuments}
          />
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
      />
    </Page>
  );
}
