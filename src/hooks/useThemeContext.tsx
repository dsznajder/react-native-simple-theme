import React, { createContext, useContext } from 'react';

import type { ThemeContextValue } from '../types';

const initialTheme: ThemeContextValue = {
  themes: {
    light: { primary: '#000', secondary: '#fff' },
    dark: { primary: '#fff', secondary: '#000' },
  },
};

const ThemeContext = createContext(initialTheme);

const ThemeProvider = React.memo(
  ({
    children,
    value = initialTheme,
  }: {
    children: React.ReactNode;
    value?: ThemeContextValue;
  }) => {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  },
);

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (typeof themeContext === 'undefined') {
    throw new Error(
      'useThemeContext must be used within a ThemeProvider\nEnsure that you wrapped your App in a <ThemeProvider>',
    );
  }
  return themeContext;
};

export default ThemeProvider;
