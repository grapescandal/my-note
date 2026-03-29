import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'my-note:dark';

interface DarkModeContextType {
  isDark: boolean;
  toggle: () => void;
  setDark: (v: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = (): DarkModeContextType => {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider');
  return ctx;
};

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === 'true') return true;
      if (v === 'false') return false;
      // default to system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isDark));
    } catch {}
    const html = document.documentElement;
    if (isDark) html.classList.add('dark'); else html.classList.remove('dark');
  }, [isDark]);

  const toggle = () => setIsDark(v => !v);

  return (
    <DarkModeContext.Provider value={{ isDark, toggle, setDark: setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;
