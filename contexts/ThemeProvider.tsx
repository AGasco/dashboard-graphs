'use client';

import { THEME_DARK, THEME_LIGHT } from '@/consts';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(THEME_LIGHT);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME_LIGHT ? THEME_DARK : THEME_LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
