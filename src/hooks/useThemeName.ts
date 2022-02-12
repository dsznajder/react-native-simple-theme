import { useColorScheme } from 'react-native';

import type { ThemeName } from '../types';

import { useThemeContext } from './useThemeContext';

const useThemeName = () => {
  const { getThemeName, themes } = useThemeContext();
  const colorScheme = useColorScheme();

  if (getThemeName) {
    return getThemeName();
  } else {
    return colorScheme || (Object.keys(themes)[0] as ThemeName);
  }
};

export default useThemeName;
