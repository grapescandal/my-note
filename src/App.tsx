import React, { useState } from 'react';
import './App.css';
import { DocumentProvider } from './context/DocumentContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DarkModeProvider>
      <DocumentProvider>
        <div className="flex h-screen">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

          {/* Mobile toggle column (visible on small screens) */}
          <div className="md:hidden flex-shrink-0 w-12 px-2 flex items-start justify-center pt-4">
            <button
              aria-label="Toggle sidebar"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              onClick={() => setSidebarOpen(o => !o)}
            >
              ☰
            </button>
          </div>

          <Editor />
        </div>
      </DocumentProvider>
    </DarkModeProvider>
  );
};

export default App;
