import type { ThemeValues } from '../types';

import useThemeName from './useThemeName';

/**
 * Usage
 * const valueBasedOnTheme = useValueBasedOnTheme({ dark: 1, light: 2 });
 */

const useValueBasedOnTheme = <T>(values: ThemeValues<T>) => {
  const themeName = useThemeName();

  return values[themeName];
};

export default useValueBasedOnTheme;
