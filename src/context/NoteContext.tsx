import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '../types';
import { loadDocs, saveDocs } from '../services/storage';
import { fetchNotes, fetchNoteById, deleteNote, saveNote as saveNoteApi } from '../services/api';

interface NoteContextType {
  notes: Note[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  createNote: () => Promise<void>;
  updateNote: (id: string, patch: Partial<Note>) => void;
  saveNote: (id?: string, patch?: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = (): NoteContextType => {
  const ctx = useContext(NoteContext);
  if (!ctx) throw new Error('useNotes must be used within NoteProvider');
  return ctx;
};

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => loadDocs());
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveDocs(notes);
  }, [notes]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const remote = await fetchNotes();
        if (!mounted) return;
        setNotes(remote);
        setActiveId(remote[0]?.id ?? null);
      } catch (e: any) {
        console.warn('Failed to fetch notes from backend, using local cache', e);
        setError(e?.message ?? String(e));
        const local = loadDocs();
        setNotes(local);
        setActiveId(local[0]?.id ?? null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  async function createNote() {
    setLoading(true);
    setError(null);
    try {
      const saved = await saveNote(undefined, { title: 'Untitled', content: '' });
      // saveNote already prepends and sets activeId when id is omitted
      return saved;
    } catch (e: any) {
      setError(e?.message ?? String(e));
      // fallback to local temp note
      const id = `local-${Date.now()}`;
      const note: Note = { id, title: 'Untitled', content: '', updatedAt: Date.now() };
      setNotes(prev => [note, ...prev]);
      setActiveId(id);
    } finally {
      setLoading(false);
    }
  }

  function updateNote(id: string, patch: Partial<Note>) {
    setNotes(prev => prev.map(d => (d.id === id ? { ...d, ...patch, updatedAt: Date.now() } : d)));
  }

  async function saveNote(id?: string, patch: Partial<Note> = {}) {
    setLoading(true);
    setError(null);
    try {
      if (!id) {
        // create new note on server
        const payload = {
          title: patch.title ?? 'Untitled',
          content: patch.content ?? '',
        };
        const saved = await saveNoteApi(payload);
        setNotes(prev => [saved, ...prev]);
        setActiveId(saved.id);
        return;
      }

      // update existing (or replace local temp)
      const existing = notes.find(n => n.id === id);
      const merged = { ...(existing ?? {}), ...(patch ?? {}) } as Note;

      const payload: { id?: string; title: string; content: string } = {
        title: merged.title,
        content: merged.content,
      };
      if (!id.startsWith('local-')) payload.id = id;

      const saved = await saveNoteApi(payload);

      setNotes(prev => {
        if (id.startsWith('local-') && saved.id !== id) {
          return prev.map(n => (n.id === id ? saved : n));
        }
        return prev.map(n => (n.id === saved.id ? saved : n));
      });

      if (id.startsWith('local-') && saved.id !== id) {
        setActiveId(saved.id);
      }
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  async function deleteNoteHandler(id: string) {
    setLoading(true);
    setError(null);
    try {
      await deleteNote(id);
      setNotes(prev => {
        const filtered = prev.filter(d => d.id !== id);
        if (activeId === id) setActiveId(filtered[0]?.id ?? null);
        return filtered;
      });
    } catch (e: any) {
      setError(e?.message ?? String(e));
      setNotes(prev => {
        const filtered = prev.filter(d => d.id !== id);
        if (activeId === id) setActiveId(filtered[0]?.id ?? null);
        return filtered;
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!activeId) return;
    const doc = notes.find(d => d.id === activeId);
    // If the note object already has a `content` property (even empty string),
    // we have the detail and should not refetch. Only fetch when `content`
    // is undefined (i.e., list provided only metadata).
    if (doc && typeof doc.content !== 'undefined') return;

    let mounted = true;
    async function loadDetail() {
      setLoading(true);
      setError(null);
      const id = activeId as string;
      try {
        const full = await fetchNoteById(id);
        if (!mounted) return;
        setNotes(prev => prev.map(d => (d.id === full.id ? full : d)));
      } catch (e: any) {
        setError(e?.message ?? String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadDetail();
    return () => {
      mounted = false;
    };
  }, [activeId, notes]);

  return (
    <NoteContext.Provider value={{ notes, activeId, setActiveId, createNote, updateNote, saveNote, deleteNote: deleteNoteHandler, loading, error }}>
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
