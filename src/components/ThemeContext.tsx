import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('reicon-theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignore localStorage security exceptions
    }
    return 'dark'; // Default to dark theme
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('no-transitions');

    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('reicon-theme', theme);
    } catch {
      // Ignore localStorage security exceptions
    }

    // Force a layout reflow to apply the theme class immediately
    const _ = window.getComputedStyle(root).opacity;

    const timer = setTimeout(() => {
      root.classList.remove('no-transitions');
    }, 50);

    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
