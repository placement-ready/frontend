'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/providers/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full border border-emerald-200 p-2.5 text-gray-600 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-emerald-500/30 dark:text-gray-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
