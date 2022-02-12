import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import ReactNative, { TextStyle } from 'react-native';

import createThemedStyles from '../../createThemedStyles';
import ThemeProvider from '../useThemeContext';
import useThemeStyle from '../useThemeStyle';

import { mockedTheme } from './fixtures';

describe('useThemeStyle', () => {
  describe('user has light system theme', () => {
    test('should return styles with light colors', () => {
      jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

      const styleFactory = createThemedStyles((palette) => ({
        container: { backgroundColor: palette.primary },
        label: { color: palette.secondary },
      }));

      const { result: style } = renderHook(() => useThemeStyle(styleFactory), {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme }}>{children}</ThemeProvider>
        ),
      });

      expect(style.current.container.backgroundColor).toBe(mockedTheme.light.primary);
      expect((style.current.label as TextStyle).color).toBe(mockedTheme.light.secondary);
    });
  });

  describe('user has dark system theme', () => {
    test('should return styles with dark colors', () => {
      jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');

      const styleFactory = createThemedStyles((palette) => ({
        container: { backgroundColor: palette.primary },
        label: { color: palette.secondary },
      }));

      const { result: style } = renderHook(() => useThemeStyle(styleFactory), {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme }}>{children}</ThemeProvider>
        ),
      });

      expect(style.current.container.backgroundColor).toBe(mockedTheme.dark.primary);
      expect((style.current.label as TextStyle).color).toBe(mockedTheme.dark.secondary);
    });
  });

  describe('user has custom theme name', () => {
    test('should return styles based on custom theme resolver', () => {
      // Override useColorScheme return type to check if we are using getThemeName from package
      jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

      const mockedGetThemeName = jest.fn().mockReturnValue('default');
      const styleFactory = createThemedStyles((palette) => ({
        container: { backgroundColor: palette.primary },
        label: { color: palette.secondary },
      }));

      const { result: style } = renderHook(() => useThemeStyle(styleFactory), {
        wrapper: ({ children }) => (
          <ThemeProvider value={{ themes: mockedTheme, getThemeName: mockedGetThemeName }}>
            {children}
          </ThemeProvider>
        ),
      });

      expect(style.current.container.backgroundColor).toBe(mockedTheme.default.primary);
      expect((style.current.label as TextStyle).color).toBe(mockedTheme.default.secondary);
    });
  });
});
