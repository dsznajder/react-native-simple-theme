import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativeSimpleTheme {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ThemePalette {}
  }
}

type StringPathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${StringPathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${StringPathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type StringPath<T> = StringPathImpl<T, keyof T> | keyof T;

export type ThemeName = keyof ReactNativeSimpleTheme.ThemePalette;

export type ThemeContextValue = {
  themes: ReactNativeSimpleTheme.ThemePalette;
  getThemeName?: () => ThemeName;
};

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type CreateThemedStyleFunc = <T>(
  factory: (palette: ReactNativeSimpleTheme.ThemePalette[ThemeName]) => NamedStyles<T>,
) => typeof factory;

export type ThemePaths = StringPath<ReactNativeSimpleTheme.ThemePalette[ThemeName]>;
