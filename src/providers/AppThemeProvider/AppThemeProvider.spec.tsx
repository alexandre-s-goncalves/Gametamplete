import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Appearance, Button, Text } from 'react-native';
import { AppThemeMode } from 'types/theme';
import { AppThemeProvider, THEME_KEY, ThemeContext } from './AppThemeProvider';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const TestComponent = () => {
  const { themeMode, changeTheme } = React.useContext(ThemeContext);
  return (
    <>
      <Text testID="theme-value">{themeMode}</Text>
      <Button
        testID="change-theme"
        title="Change Theme"
        onPress={() => changeTheme('dark' as AppThemeMode)}
      />
    </>
  );
};

describe('AppThemeProvider', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  test('SHOULD load stored theme from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('dark');

    component = render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>,
    );

    const themeValue = await waitFor(() =>
      component.getByTestId('theme-value'),
    );
    expect(themeValue.props.children).toBe('dark');
  });

  test('SHOULD fallback to system theme WHEN no stored value', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    jest.spyOn(Appearance, 'getColorScheme').mockReturnValue('dark');

    component = render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>,
    );

    const themeValue = await waitFor(() =>
      component.getByTestId('theme-value'),
    );
    expect(themeValue.props.children).toBe('system');
  });

  test('SHOULD change theme and persist to AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('light');

    component = render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>,
    );

    fireEvent.press(component.getByTestId('change-theme'));

    await waitFor(() => {
      expect(component.getByTestId('theme-value').props.children).toBe('dark');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(THEME_KEY, 'dark');
    });
  });
});
