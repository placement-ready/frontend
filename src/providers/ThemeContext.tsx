// src/providers/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = 'theme';
const THEME_TRANSITION_MS = 350;

const getPreferredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const hasStoredTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark';
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
  root.style.setProperty('color-scheme', theme);

  root.classList.add('theme-transition');
  window.setTimeout(() => root.classList.remove('theme-transition'), THEME_TRANSITION_MS);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const [hasUserPreference, setHasUserPreference] = useState(() => hasStoredTheme());

  useEffect(() => {
    applyTheme(theme);
    if (hasUserPreference && typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme, hasUserPreference]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (hasUserPreference) {
        return;
      }
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [hasUserPreference]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme: () => {
        setHasUserPreference(true);
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
