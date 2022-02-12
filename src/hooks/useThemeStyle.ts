import type { NamedStyles, ThemeName } from '../types';

import { useThemeContext } from './useThemeContext';
import useThemeName from './useThemeName';

const useThemeStyle = <T>(
  styledThemeFactory: (palette: ReactNativeSimpleTheme.ThemePalette[ThemeName]) => NamedStyles<T>,
): NamedStyles<T> => {
  const themeName = useThemeName();
  const { themes } = useThemeContext();

  const palette = themes[themeName];

  if (!palette) {
    throw new Error(`Theme not defined: ${themeName}`);
  }

  return styledThemeFactory(palette);
};

export default useThemeStyle;
