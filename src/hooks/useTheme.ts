/**
 * Theme Hook
 * Simple theme management for command palette
 */

import { useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system';

const THEME_STORAGE_KEY = 'ydk-portfolio-theme';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Get theme from localStorage or default to 'dark'
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored as ThemeMode) || 'dark';
  });

  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(effectiveTheme);
    
    // Store theme preference
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    setTheme(current => {
      switch (current) {
        case 'dark':
          return 'light';
        case 'light':
          return 'system';
        case 'system':
          return 'dark';
        default:
          return 'dark';
      }
    });
  };

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
  };

  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  return {
    theme,
    effectiveTheme,
    systemTheme,
    toggleTheme,
    setTheme: setThemeMode,
  };
}