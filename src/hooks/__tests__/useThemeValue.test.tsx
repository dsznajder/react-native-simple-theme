import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';

import ThemeProvider from '../useThemeContext';
import useThemeValue from '../useThemeValue';

import { mockedTheme } from './fixtures';

describe('useThemeValue', () => {
  test('should return a value for given path for current theme', () => {
    const mockedGetThemeName = jest.fn().mockReturnValue('default');
    const { result } = renderHook<{ children: ReactNode }, ReactNode>(
      () => useThemeValue('primary'),
      {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
            {children}
          </ThemeProvider>
        ),
      },
    );

    expect(result.current).toBe(mockedTheme.default.primary);
  });

  test('should return a value for nested given path for current theme', () => {
    const mockedGetThemeName = jest.fn().mockReturnValue('default');
    const { result } = renderHook<{ children: ReactNode }, ReactNode>(
      // @ts-expect-error We are trying to get nested value that exists only in one theme
      () => useThemeValue('text.primary'),
      {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
            {children}
          </ThemeProvider>
        ),
      },
    );

    expect(result.current).toBe(mockedTheme.default.text.primary);
  });

  test('should throw an error if current theme does not satisfy given path', () => {
    const themeName = 'light';
    const valuePath = 'text.primary';
    const mockedGetThemeName = jest.fn().mockReturnValue(themeName);
    const { result } = renderHook<{ children: ReactNode }, ReactNode>(
      // @ts-expect-error We are trying to get nested value that exists only in one theme
      () => useThemeValue(valuePath),
      {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
            {children}
          </ThemeProvider>
        ),
      },
    );

    expect(result.error?.message).toBe(
      `Theme value "${valuePath}" was not found in "${themeName}" Theme`,
    );
  });

  test('should throw an error for unsupported theme usage', () => {
    const customTheme = 'custom';
    const mockedGetThemeName = jest.fn().mockReturnValue(customTheme);
    const { result } = renderHook<{ children: ReactNode }, ReactNode>(
      () => useThemeValue('primary'),
      {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
            {children}
          </ThemeProvider>
        ),
      },
    );

    expect(result.error?.message).toBe(`Theme not defined: ${customTheme}`);
  });
});
