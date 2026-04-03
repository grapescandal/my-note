import React from 'react';
import { useNotes } from '../context/NoteContext';
import { useDarkMode } from '../context/DarkModeContext';

type Props = {
  open?: boolean;
  setOpen?: (v: boolean) => void;
};

const Sidebar: React.FC<Props> = ({ open = false, setOpen }) => {
  const { notes, activeId, createNote, openNote, deleteNote } = useNotes();
  const { isDark, toggle } = useDarkMode();

  return (
    <>
      {/* overlay when mobile sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen?.(false)}
        />
      )}

      <aside
        className={
          `fixed top-0 left-0 h-full z-40 transform transition-transform md:static md:translate-x-0 ` +
          `${open ? 'translate-x-0' : '-translate-x-full'} md:w-72 w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 md:pr-4 md:pl-4 md:py-4 md:mr-4 overflow-y-auto max-h-screen`
        }
      >
        {/* close button for mobile */}
        <div className="flex items-center justify-end md:hidden mb-2">
          <button
            aria-label="Close sidebar"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            onClick={() => setOpen?.(false)}
          >
            ×
          </button>
        </div>
      <div className="flex justify-between mb-2 items-center">
        <strong className="text-gray-900 dark:text-white">Notes</strong>
        <div className="flex items-center gap-2">
          <button
            className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded"
            onClick={createNote}
          >
            New
          </button>
          <button
            className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded"
            onClick={toggle}
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
      <ul className="space-y-1">
        {notes.map(d => (
          <li key={d.id} className={`p-2 rounded ${d.id === activeId ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
            <div className="flex justify-between items-center">
              <button className="text-left flex-1 truncate md:inline" onClick={() => openNote(d.id)}>
                <span className="hidden md:inline">{d.title}</span>
                <span className="md:hidden">{d.title ? d.title.charAt(0) : ''}</span>
              </button>
              <button
                className="ml-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                onClick={() => deleteNote(d.id)}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      </aside>
    </>
  );
};

export default Sidebar;
