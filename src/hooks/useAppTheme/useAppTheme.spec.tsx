import { render } from '@testing-library/react-native';
import { ThemeContext } from 'providers/AppThemeProvider';
import React from 'react';
import { Text } from 'react-native';
import { AppThemeMode } from 'types/theme';
import { useAppTheme } from './useAppTheme';

const TestComponent = () => {
  const { themeMode } = useAppTheme();
  return <Text testID="theme-value">{themeMode}</Text>;
};

describe('useAppTheme', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD return context value WHEN provided by ThemeContext', () => {
      const mockContextValue = {
        themeMode: 'light' as AppThemeMode,
        changeTheme: jest.fn(),
      };

      const { getByTestId } = render(
        <ThemeContext.Provider value={mockContextValue}>
          <TestComponent />
        </ThemeContext.Provider>,
      );

      expect(getByTestId('theme-value').props.children).toBe('light');
    });
  });

  describe('behavior', () => {
    test('SHOULD call changeTheme WHEN invoked from context', () => {
      const mockChangeTheme = jest.fn();
      const mockContextValue = {
        themeMode: 'dark' as AppThemeMode,
        changeTheme: mockChangeTheme,
      };

      const TestComponentWithAction = () => {
        const { themeMode, changeTheme } = useAppTheme();
        changeTheme('light' as AppThemeMode);
        return <Text testID="theme-value">{themeMode}</Text>;
      };

      render(
        <ThemeContext.Provider value={mockContextValue}>
          <TestComponentWithAction />
        </ThemeContext.Provider>,
      );

      expect(mockChangeTheme).toHaveBeenCalledWith('light');
    });
  });
});
