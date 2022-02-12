export const mockedTheme = {
  default: {
    primary: '#f0f',
    secondary: '#0f0',
  },
  dark: {
    primary: '#000',
    secondary: '#fff',
  },
  light: {
    primary: '#fff',
    secondary: '#000',
  },
};

type PaletteType = typeof mockedTheme;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativeSimpleTheme {
    interface ThemePalette extends PaletteType {}
  }
}
