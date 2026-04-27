import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it } from 'vitest';

import { CreateApplicationPage } from './pages/CreateApplicationPage';
import { DashboardPage } from './pages/DashboardPage';
import type { JobApplicationDocument } from './lib/storage/DocumentsStorage';

const documents: JobApplicationDocument[] = [
  {
    id: 'doc-1',
    jobTitle: 'Frontend engineer',
    company: 'Stripe',
    strengths: 'React and TypeScript',
    additionalDetails: 'Ships polished product experiences',
    coverLetter: 'Dear Stripe team, I would love to help build polished interfaces.',
    createdAt: '2026-04-27T20:00:00.000Z'
  }
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
    }
  };
}

describe('raw HTML structure', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: createStorageStub(),
      configurable: true
    });
  });
  it('renders dashboard without custom class-based styling hooks', () => {
    const markup = renderToStaticMarkup(
      <DashboardPage documents={documents} onDelete={() => undefined} />
    );

    expect(markup).not.toContain('class=');
  });

  it('renders create page without custom class-based styling hooks', () => {
    const markup = renderToStaticMarkup(
      <CreateApplicationPage documentsCount={documents.length} onDocumentCreated={() => undefined} />
    );

    expect(markup).not.toContain('class=');
  });
});
