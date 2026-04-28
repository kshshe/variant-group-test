import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it } from 'vitest';

import { CreateApplicationPage } from './pages/CreateApplicationPage/CreateApplicationPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import type { JobApplicationDocument } from './lib/storage/DocumentsStorage';

const documents: JobApplicationDocument[] = [
  {
    id: 'doc-1',
    jobTitle: 'Frontend engineer',
    company: 'Stripe',
    strengths: 'React and TypeScript',
    additionalDetails: 'Ships polished product experiences',
    coverLetter:
      'Dear Stripe team, I would love to help build polished interfaces.',
    createdAt: '2026-04-27T20:00:00.000Z',
  },
];

function createStorageStub() {
  const map = new Map<string, string>();

  return {
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
    removeItem(key: string) {
      map.delete(key);
    },
    clear() {
      map.clear();
    },
  };
}

describe('raw HTML structure', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: createStorageStub(),
      configurable: true,
    });
  });
  it('renders dashboard with the expected content', () => {
    const markup = renderToStaticMarkup(
      <DashboardPage documents={documents} onDelete={() => undefined} />,
    );

    expect(markup).toContain('Applications');
    expect(markup).toContain('Create New');
    expect(markup).toContain(
      'Dear Stripe team, I would love to help build polished interfaces.',
    );
  });

  it('renders create page with the expected content', () => {
    const markup = renderToStaticMarkup(
      <CreateApplicationPage
        documentsCount={documents.length}
        onDocumentCreated={() => undefined}
      />,
    );

    expect(markup).toContain('New application');
    expect(markup).toContain('Generate Now');
    expect(markup).toContain(
      'Your generated cover letter will appear here after a successful request.',
    );
  });
});
