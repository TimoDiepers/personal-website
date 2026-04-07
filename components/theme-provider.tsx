'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'theme-preference';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  ready: boolean;
  toggleTheme: () => void;
  setTheme: (value: Theme) => void;
  syncWithSystem: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const persistTheme = (value: Theme) => {
  window.localStorage.setItem(STORAGE_KEY, value);
};

const suppressTransitions = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const style = document.createElement('style');
  style.appendChild(document.createTextNode('* { transition: none !important; }'));
  document.head.appendChild(style);

  // Force style recalculation so transition suppression applies immediately.
  window.getComputedStyle(document.body);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.head.removeChild(style);
    });
  });
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [ready, setReady] = useState(false);
  const [hasStoredPreference, setHasStoredPreference] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;

    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
      setHasStoredPreference(true);
    } else {
      setThemeState(getSystemTheme());
      setHasStoredPreference(false);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === 'undefined') {
      return;
    }

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, ready]);

  useEffect(() => {
    if (!ready || hasStoredPreference || typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setThemeState(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [ready, hasStoredPreference]);

  const setTheme = useCallback((value: Theme) => {
    suppressTransitions();
    setThemeState(value);
    if (typeof window !== 'undefined') {
      persistTheme(value);
    }
    setHasStoredPreference(true);
    setReady(true);
  }, []);

  const toggleTheme = useCallback(() => {
    suppressTransitions();
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        persistTheme(next);
      }
      return next;
    });
    setHasStoredPreference(true);
    setReady(true);
  }, []);

  const syncWithSystem = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }
    suppressTransitions();
    window.localStorage.removeItem(STORAGE_KEY);
    setThemeState(getSystemTheme());
    setHasStoredPreference(false);
    setReady(true);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        ready,
        toggleTheme,
        setTheme,
        syncWithSystem,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
