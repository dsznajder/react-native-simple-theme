import type { ThemePaths } from '../types';

import { useThemeContext } from './useThemeContext';
import useThemeName from './useThemeName';

const cache = {} as { [key: string]: any };

const getThemeValueFromPath = <T extends string>({
  cacheKey,
  keys,
  themeOrNested,
}: {
  cacheKey?: string;
  keys: string[];
  themeOrNested: { [key: string]: { [key: string]: T } | T };
}): T | undefined => {
  if (!themeOrNested) return;
  if (cacheKey && cache[cacheKey]) return cache[cacheKey];

  const [first, ...rest] = keys;

  if (rest.length === 0) {
    const color = (themeOrNested as { [key: string]: T })[first];
    if (cacheKey) cache[cacheKey] = color;

    return color;
  }

  return getThemeValueFromPath({
    themeOrNested: themeOrNested[first] as { [key: string]: T },
    keys: rest,
    cacheKey,
  });
};

/**
 * Usage
 * const themeValue = useThemeValue('icon.primary');
 */

const useThemeValue = (themePath: ThemePaths) => {
  const themeName = useThemeName();
  const { themes } = useThemeContext();

  const keys = themePath.split('.');
  const cacheKey = `${themeName}-${themePath}`;
  const theme = themes[themeName];

  if (!theme) {
    throw new Error(`Theme not defined: ${themeName}`);
  }

  const themeValue = getThemeValueFromPath({ cacheKey, keys, themeOrNested: theme });

  if (!themeValue) {
    throw new Error(`Theme value "${themePath}" was not found in "${themeName}" Theme`);
  }

  return themeValue;
};

export default useThemeValue;
