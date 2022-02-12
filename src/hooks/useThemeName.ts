import { useColorScheme } from 'react-native';

import type { ThemeName } from '../types';

import { useThemeContext } from './useThemeContext';

const useThemeName = () => {
  const { getThemeName } = useThemeContext();

  // We are not expecting the useColorScheme hook to return anything besides 'light' or 'dark'
  // @ts-expect-error
  const colorScheme: ThemeName = useColorScheme();

  return getThemeName?.() || colorScheme;
};

export default useThemeName;
