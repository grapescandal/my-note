import { Notes } from "../types";

const KEY = "my-note:notes";

export function loadDocs(): Notes {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Notes;
  } catch (e) {
    console.error("Failed to load notes from localStorage", e);
    return [];
  }
}

export function saveDocs(docs: Notes): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(docs));
  } catch (e) {
    console.error("Failed to save notes to localStorage", e);
  }
}
