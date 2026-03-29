import { Documents } from '../types';

const KEY = 'my-note:documents';

export function loadDocs(): Documents {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Documents;
  } catch (e) {
    console.error('Failed to load documents from localStorage', e);
    return [];
  }
}

export function saveDocs(docs: Documents): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(docs));
  } catch (e) {
    console.error('Failed to save documents to localStorage', e);
  }
}
