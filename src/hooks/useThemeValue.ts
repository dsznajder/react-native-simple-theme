import type { ThemePaths } from '../types';

import { useThemeContext } from './useThemeContext';
import useThemeName from './useThemeName';

const cache = {} as { [key: string]: string };

const getColorKeyPath = <T extends string>({
  keys,
  paletteOrNested,
  cacheKey,
}: {
  cacheKey?: string;
  keys: string[];
  paletteOrNested: { [key: string]: { [key: string]: T } | T };
}): string => {
  if (cacheKey && cache[cacheKey]) return cache[cacheKey];

  const [first, ...rest] = keys;
  if (!first) return '';

  if (rest.length === 0) {
    const color = (paletteOrNested as { [key: string]: T })[first];
    if (cacheKey) cache[cacheKey] = color;

    return color;
  }

  return getColorKeyPath({
    paletteOrNested: paletteOrNested[first] as { [key: string]: T },
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
  const cacheKey = `${themeName}-${keys.join('.')}`;
  const palette = themes[themeName];

  return getColorKeyPath({
    cacheKey,
    keys,
    paletteOrNested: palette,
  });
};

export default useThemeValue;
