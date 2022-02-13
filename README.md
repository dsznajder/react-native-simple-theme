# react-native-simple-theme

## Description

Small and simple theme manager for react-native with out-of-the-box support for dark and light themes based on system settings (via `useColorScheme` hook from `react-native`).
Fully typed and easy to extend with your own themes.

## Installation

```sh
yarn add react-native-simple-theme
```

## API

|            Methods | Params                                                                              | Description                                                                                                                                |
| -----------------: | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
|       useThemeName | -                                                                                   | returns name of current theme returned from context.getThemeName or value of [useColorScheme](https://reactnative.dev/docs/usecolorscheme) |
|      useThemeStyle | styleFactory - function returned from `createThemedStyles`                          | returns styled object with applied theme values                                                                                            |
|      useThemeValue | themePath - path to theme value i.e. `text.primary`                                 | returns value from defined theme by path                                                                                                   |
| createThemedStyles | factoryFunction - function which gets theme as first param and returns style object | returns style factory function which should be provided to `useThemeStyle` hook                                                            |

|    Components | Props                | Description                                                         | Default value                             |
| ------------: | -------------------- | ------------------------------------------------------------------- | ----------------------------------------- |
| ThemeProvider | `value`              | context object containing themes and optional getThemeName function | -                                         |
|             - | `value.themes`       | object containing themes definition. _Required_                     | {}                                        |
|             - | `value.getThemeName` | optional function returning your own theme name based on values     | `useColorScheme` hook from `react-native` |

## Typescript

To type the theme object you can use the following code:

```ts
const themes = {
  light: {
    first: '#fff',
    second: '#000',
  },
  dark: {
    first: '#000',
    second: '#fff',
  },
};

type ThemePaletteType = typeof themes;

declare global {
  namespace ReactNativeSimpleTheme {
    interface ThemePalette extends ThemePaletteType {}
  }
}
```

It's recommended to place it inside `typings/index.d.ts` to work out of the box with TypeScript.

## Usage

- Basic `useThemeStyle` usage:

```tsx
import { createThemedStyles, ThemeProvider, useThemeStyle } from 'react-native-simple-theme';

const themes = {
  light: {
    primary: '#fff',
    secondary: '#000',
  },
  dark: {
    primary: '#000',
    secondary: '#fff',
  },
};

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider value={{ themes }}>{children}</ThemeProvider>
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
```

- `useThemeValue` / `useValueBasedOnTheme` usage:

```tsx
// themes passed to ThemeProvider
const themes = {
  light: { icon: { primary: '#aaa' } },
  dark: { icon: { primary: '#999' } },
};

const Example = () => {
  const iconName = useValueBasedOnTheme({ dark: 'chevron', light: 'close' });
  const iconColor = useThemeValue('icon.primary');

  // iconName and iconColor will change along with theme.
  return <Icon color={iconColor} name={iconName} />;
};
```

- `ThemeProvider` usage:

```tsx
const themes = {
  blue: { icon: { primary: '#00f' } },
  red: { icon: { primary: '#f00' } },
};

const Example = () => {
  const getThemeName = useCallback(() => {
    const currentAppTheme = getAppTheme(); // returns 'blue' or 'red'
    return currentAppTheme;
  }, [getAppTheme]);

  return (
    <ThemeProvider value={{ themes, getThemeName }}>
      <ExampleComponent />
    </ThemeProvider>
  );
};
```

## Contributing

### Setup

1. `yarn`

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

### TODO:

- [ ] Documentation
- [ ] Optimizations
- [ ] Reduce bundle size to minimum
