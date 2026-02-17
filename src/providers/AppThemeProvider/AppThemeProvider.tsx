import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { darkTheme } from 'resources/themes/dark';
import { lightTheme } from 'resources/themes/light';
import { ThemeProvider as StyledProvider } from 'styled-components/native';
import { AppThemeMode } from 'types/theme';

export const THEME_KEY = '@app_theme';

interface ThemeContextProps {
  themeMode: AppThemeMode;
  changeTheme: (mode: AppThemeMode) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<AppThemeMode>('system');
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    async function loadTheme() {
      const stored = await AsyncStorage.getItem(THEME_KEY);

      const mode = (stored as AppThemeMode) || 'system';
      setThemeMode(mode);
      applyTheme(mode);
    }

    loadTheme();
  }, []);

  function applyTheme(mode: AppThemeMode) {
    if (mode === 'system') {
      const system = Appearance.getColorScheme();
      setCurrentTheme(system === 'dark' ? darkTheme : lightTheme);
    } else {
      setCurrentTheme(mode === 'dark' ? darkTheme : lightTheme);
    }
  }

  async function changeTheme(mode: AppThemeMode) {
    setThemeMode(mode);
    applyTheme(mode);
    await AsyncStorage.setItem(THEME_KEY, mode);
  }

  return (
    <ThemeContext.Provider value={{ themeMode, changeTheme }}>
      <StyledProvider theme={currentTheme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};
