import React, { createContext, useContext, useEffect, useState } from 'react';
import { Document } from '../types';
import { loadDocs, saveDocs } from '../services/storage';

interface DocumentContextType {
  docs: Document[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  createDoc: () => void;
  updateDoc: (id: string, patch: Partial<Document>) => void;
  deleteDoc: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = (): DocumentContextType => {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error('useDocuments must be used within DocumentProvider');
  return ctx;
};

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [docs, setDocs] = useState<Document[]>(() => loadDocs());
  const [activeId, setActiveId] = useState<string | null>(docs[0]?.id ?? null);

  useEffect(() => {
    saveDocs(docs);
  }, [docs]);

  function createDoc() {
    const id = Date.now().toString();
    const doc: Document = { id, title: 'Untitled', content: '', updatedAt: Date.now() };
    setDocs(prev => [doc, ...prev]);
    setActiveId(id);
  }

  function updateDoc(id: string, patch: Partial<Document>) {
    setDocs(prev => prev.map(d => (d.id === id ? { ...d, ...patch, updatedAt: Date.now() } : d)));
  }

  function deleteDoc(id: string) {
    setDocs(prev => prev.filter(d => d.id !== id));
    if (activeId === id) setActiveId(docs[0]?.id ?? null);
  }

  return (
    <DocumentContext.Provider value={{ docs, activeId, setActiveId, createDoc, updateDoc, deleteDoc }}>
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentContext;
