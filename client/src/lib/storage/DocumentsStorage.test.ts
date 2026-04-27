import { beforeEach, describe, expect, it } from 'vitest';

import { DocumentsStorage, type JobApplicationDocument, type StorageProvider } from './DocumentsStorage';

function createMemoryStorage(): StorageProvider {
  const map = new Map<string, string>();

  return {
    getItem(key) {
      return map.has(key) ? map.get(key)! : null;
    },
    setItem(key, value) {
      map.set(key, value);
    },
    removeItem(key) {
      map.delete(key);
    }
  };
}

function createDocument(overrides: Partial<JobApplicationDocument> = {}): JobApplicationDocument {
  return {
    id: 'doc-1',
    jobTitle: 'Product manager',
    company: 'Apple',
    strengths: 'HTML, CSS and doing things in time',
    additionalDetails: 'Ships polished UX',
    coverLetter: 'Dear Apple Team',
    createdAt: '2026-04-27T20:00:00.000Z',
    ...overrides
  };
}

describe('DocumentsStorage', () => {
  beforeEach(() => {
    DocumentsStorage.setStorageProvider(createMemoryStorage());
  });

  it('adds a document and returns it from getAll', () => {
    const storage = new DocumentsStorage();
    const document = createDocument();

    storage.add(document);

    expect(storage.getAll()).toEqual([document]);
  });

  it('deletes a document by id', () => {
    const storage = new DocumentsStorage();

    storage.add(createDocument());
    storage.add(createDocument({ id: 'doc-2', company: 'Stripe' }));

    storage.delete('doc-1');

    expect(storage.getAll()).toEqual([
      expect.objectContaining({ id: 'doc-2', company: 'Stripe' })
    ]);
  });
});
