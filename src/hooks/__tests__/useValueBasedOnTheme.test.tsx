import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import ThemeProvider from '../useThemeContext';
import useValueBasedOnTheme from '../useValueBasedOnTheme';

import { mockedTheme } from './fixtures';

describe('useValueBasedOnTheme', () => {
  test('should return a value based on theme for given object mapping', () => {
    const defaultValue = 1;
    const lightValue = 2;
    const darkValue = 3;

    const mockedGetThemeName = jest
      .fn()
      .mockReturnValueOnce('default')
      .mockReturnValueOnce('light')
      .mockReturnValueOnce('dark');

    const { result, rerender } = renderHook(
      () => useValueBasedOnTheme({ default: defaultValue, light: lightValue, dark: darkValue }),
      {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
            {children}
          </ThemeProvider>
        ),
      },
    );

    expect(result.current).toBe(defaultValue);

    rerender();
    expect(result.current).toBe(lightValue);

    rerender();
    expect(result.current).toBe(darkValue);
  });
});
