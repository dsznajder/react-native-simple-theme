import React from 'react';
import { Text, View } from 'react-native';
// @ts-expect-error
import { createThemedStyles, ThemeProvider, useThemeStyle } from 'react-native-simple-theme';

const theme = {
  light: {
    primary: '#ff0000',
    secondary: '#00ff00',
  },
  dark: {
    primary: '#0000ff',
    secondary: '#ff00ff',
  },
};

type PaletteType = typeof theme;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativeSimpleTheme {
    interface ThemePalette extends PaletteType {}
  }
}

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider value={{ themes: theme }}>{children}</ThemeProvider>
);

const TestComponent = () => {
  const style = useThemeStyle(styles);

  return (
    <View style={style.container}>
      <View style={style.box}>
        <Text style={style.text}>Test theme text</Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <TestComponent />
    </AppProvider>
  );
}

const styles = createThemedStyles((palette) => ({
  text: {
    color: palette.primary,
    padding: 10,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: palette.secondary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
