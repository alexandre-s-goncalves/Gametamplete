import { ThemeContext } from 'providers/AppThemeProvider';
import { useContext } from 'react';

export function useAppTheme() {
  return useContext(ThemeContext);
}
