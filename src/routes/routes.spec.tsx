import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RootStack } from './routes';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    PanGestureHandler: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    TapGestureHandler: ({ children }: { children: React.ReactNode }) => (
      <View>{children}</View>
    ),
    State: {},
  };
});

jest.mock('screens/MenuScreen', () => {
  const { Button, Text } = require('react-native');
  return {
    MenuScreen: ({ navigation }: { navigation: any }) => (
      <>
        <Text testID="menu-screen">Menu Screen</Text>
        <Button
          testID="go-to-settings"
          title="Go to Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </>
    ),
  };
});

jest.mock('screens/SettingsScreen', () => {
  const { Text } = require('react-native');
  return {
    SettingsScreen: () => <Text testID="settings-screen">Settings Screen</Text>,
  };
});

const mockTheme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    card: '#f0f0f0',
    border: '#cccccc',
    text: '#000000',
    primary: '#007AFF',
  },
};

describe('RootStack', () => {
  let component: RenderAPI;

  const renderStack = () => {
    component = render(
      <ThemeProvider theme={mockTheme}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>,
    );
    return component;
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD render initial route as Menu', () => {
      const { getByTestId } = renderStack();
      expect(getByTestId('menu-screen')).toBeTruthy();
    });
  });

  describe('behavior', () => {
    test('SHOULD navigate to Settings WHEN button is pressed', () => {
      const { getByTestId } = renderStack();
      fireEvent.press(getByTestId('go-to-settings'));
      expect(getByTestId('settings-screen')).toBeTruthy();
    });

    test('SHOULD show Settings header WHEN navigating to Settings', () => {
      const { getByTestId, getByText } = renderStack();
      fireEvent.press(getByTestId('go-to-settings'));
      expect(getByText('settings.title')).toBeTruthy();
    });

    test('SHOULD NOT show header on Menu screen', () => {
      const { getByTestId, queryByText } = renderStack();
      expect(getByTestId('menu-screen')).toBeTruthy();
      expect(queryByText('game.welcome')).toBeNull();
    });
  });
});
