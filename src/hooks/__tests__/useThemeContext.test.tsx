import { renderHook } from '@testing-library/react-hooks';

import { useThemeContext } from '../useThemeContext';

describe('useThemeContext', () => {
  test('should throw an error when hook is used outside ThemeProvider', () => {
    const { result } = renderHook(useThemeContext);

    expect(result.error?.message).toBe(
      'useThemeContext must be used within a ThemeProvider\nEnsure that you wrapped your App in a <ThemeProvider>',
    );
  });
});
