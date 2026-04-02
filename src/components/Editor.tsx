import React, { useMemo, useEffect, useRef } from 'react';
import { useNotes } from '../context/NoteContext';

const Editor: React.FC = () => {
  const { notes, activeId, updateNote, saveNote } = useNotes();
  const active = useMemo(() => notes.find(d => d.id === activeId) ?? null, [notes, activeId]);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    // debounce save after user stops typing for 800ms
    if (!active) return;

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      saveNote(active.id, { title: active.title, content: active.content }).catch(() => {
        // errors handled in context
      });
      timer.current = null;
    }, 800);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
    };
  }, [active?.title, active?.content, active?.id, saveNote]);

  if (!active) return <main className="p-4">No note selected</main>;

  return (
    <main className="p-4 flex-1 min-w-0">
      <input
        value={active.title}
        onChange={e => updateNote(active.id, { title: e.currentTarget.value })}
        placeholder="Title"
        className="w-full text-xl font-semibold mb-2 p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <textarea
        value={active.content}
        onChange={e => updateNote(active.id, { content: e.currentTarget.value })}
        className="w-full h-[60vh] p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </main>
  );
};

export default Editor;
