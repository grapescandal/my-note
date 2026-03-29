import React, { useMemo } from 'react';
import { useDocuments } from '../context/DocumentContext';

const Editor: React.FC = () => {
  const { docs, activeId, updateDoc } = useDocuments();
  const active = useMemo(() => docs.find(d => d.id === activeId) ?? null, [docs, activeId]);

  if (!active) return <main className="p-4">No document selected</main>;

  return (
    <main className="p-4 flex-1 min-w-0">
      <input
        value={active.title}
        onChange={e => updateDoc(active.id, { title: e.currentTarget.value })}
        placeholder="Title"
        className="w-full text-xl font-semibold mb-2 p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <textarea
        value={active.content}
        onChange={e => updateDoc(active.id, { content: e.currentTarget.value })}
        className="w-full h-[60vh] p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </main>
  );
};

export default Editor;
