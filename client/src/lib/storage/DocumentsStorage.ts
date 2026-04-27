import type { GenerateCoverLetterRequest } from '../api/types';

export interface StorageProvider {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface JobApplicationDocument extends GenerateCoverLetterRequest {
  id: string;
  coverLetter: string;
  createdAt: string;
}

const STORAGE_KEY = 'pdfnet-documents';

function createMemoryStorage(): StorageProvider {
  const storage = new Map<string, string>();

  return {
    getItem(key) {
      return storage.has(key) ? storage.get(key)! : null;
    },
    setItem(key, value) {
      storage.set(key, value);
    },
    removeItem(key) {
      storage.delete(key);
    },
  };
}

function resolveDefaultStorageProvider(): StorageProvider {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createMemoryStorage();
  }

  return window.localStorage;
}

export class DocumentsStorage {
  private static storageProvider: StorageProvider =
    resolveDefaultStorageProvider();

  static setStorageProvider(provider: StorageProvider) {
    DocumentsStorage.storageProvider = provider;
  }

  static resetStorageProvider() {
    DocumentsStorage.storageProvider = resolveDefaultStorageProvider();
  }

  static getAll(): JobApplicationDocument[] {
    const raw = DocumentsStorage.storageProvider.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as JobApplicationDocument[];
    } catch {
      DocumentsStorage.storageProvider.removeItem(STORAGE_KEY);
      return [];
    }
  }

  static add(document: JobApplicationDocument) {
    const nextDocuments = [
      document,
      ...this.getAll().filter((item) => item.id !== document.id),
    ];
    this.save(nextDocuments);
    return document;
  }

  static delete(documentId: string) {
    const nextDocuments = this.getAll().filter(
      (document) => document.id !== documentId,
    );
    this.save(nextDocuments);
  }

  private static save(documents: JobApplicationDocument[]) {
    DocumentsStorage.storageProvider.setItem(
      STORAGE_KEY,
      JSON.stringify(documents),
    );
  }
}
