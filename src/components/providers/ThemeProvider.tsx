import { useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import {
  THEME_STORAGE_KEY,
  ThemeContext,
  applyTheme,
  resolveInitialTheme,
  type Theme,
  type ThemeContextValue,
} from '@/lib/theme';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
