import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '../types';
import { loadDocs, saveDocs } from '../services/storage';
import { fetchNotes, fetchNoteById, deleteNote, saveNote as saveNoteApi } from '../services/api';

// Dev-only: prevent duplicate initial load when React Strict Mode remounts
let initialLoadDone = false;

interface NoteContextType {
  notes: Note[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  openNote: (id: string) => Promise<void>;
  createNote: () => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
  saveNote: (patch?: Partial<Note>) => Promise<void>;
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
      if (process.env.NODE_ENV === 'development' && initialLoadDone) return;
      initialLoadDone = true;
      setLoading(true);
      setError(null);
      try {
        const remote = await fetchNotes();
        if (!mounted) return;
        setNotes(remote ?? []);
        setActiveId(remote?.[0]?.id ?? null);
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


  function updateNote(id: string, patch: Partial<Note>) {
    setNotes(prev => prev.map(d => (d.id === id ? { ...d, ...patch, updatedAt: Date.now() } : d)));
  }

  async function saveNote(patch: Partial<Note> = {}) {
    setLoading(true);
    setError(null);
    try {
      const id = activeId;

      // If there's no active id or it's a local temporary id, create on server
      if (!id || id.startsWith('local-')) {
        const payload = {
          title: patch.title ?? 'Untitled',
          content: patch.content ?? '',
        };
        const saved = await saveNoteApi(payload);
        if (!saved) throw new Error('Empty response from saveNote');

        setNotes(prev => {
          if (id && id.startsWith('local-')) {
            return prev.map(n => (n.id === id ? saved : n));
          }
          return [saved, ...prev];
        });

        setActiveId(saved.id ?? null);
        return;
      }

      // Update existing note
      const existing = notes.find(n => n.id === id);
      const merged = { ...(existing ?? {}), ...(patch ?? {}) } as Note;
      const payload = { id, title: merged.title ?? 'Untitled', content: merged.content ?? '' };
      const saved = await saveNoteApi(payload);
      if (!saved) throw new Error('Empty response from saveNote');

      setNotes(prev => prev.map(n => (n.id === saved.id ? saved : n)));
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  function createNote() {
    // create a local temporary note and focus it — it will be saved by autosave
    const id = `local-${Date.now()}`;
    const note: Note = { id, title: 'Untitled', content: '', updatedAt: Date.now() };
    setNotes(prev => [note, ...prev]);
    setActiveId(id);
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

  async function openNote(id: string) {
    setActiveId(id);
    setLoading(true);
    setError(null);
    try {
      const full = await fetchNoteById(id);
      setNotes(prev => prev.map(d => (d.id === full.id ? full : d)));
    } catch (e: any) {
      setError(e?.message ?? String(e));
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
  }, [activeId]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        activeId,
        setActiveId,
        openNote,
        createNote,
        updateNote,
        saveNote,
        deleteNote: deleteNoteHandler,
        loading,
        error,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteContext;
