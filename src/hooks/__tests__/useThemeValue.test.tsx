import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import ThemeProvider from '../useThemeContext';
import useThemeValue from '../useThemeValue';

import { mockedTheme } from './fixtures';

describe('useThemeValue', () => {
  test('should return a value for given path for current theme', () => {
    const mockedGetThemeName = jest.fn().mockReturnValue('default');
    const { result } = renderHook(() => useThemeValue('primary'), {
      wrapper: ({ children }) => (
        <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
          {children}
        </ThemeProvider>
      ),
    });

    expect(result.current).toBe(mockedTheme.default.primary);
  });
});
