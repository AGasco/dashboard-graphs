'use client';
import { THEME_DARK, THEME_LIGHT } from '@/consts';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
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
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setTheme(prefersDark ? THEME_DARK : THEME_LIGHT);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
