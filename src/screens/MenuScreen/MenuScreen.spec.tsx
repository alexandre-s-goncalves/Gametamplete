import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { lightTheme } from 'resources/themes/light';
import { ThemeProvider } from 'styled-components/native';
import { MenuScreen } from './MenuScreen';

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en' }],
  locale: 'en',
  locales: ['en'],
}));

jest.mock('../../i18n', () => ({
  changeAppLanguage: jest.fn().mockResolvedValue(undefined),
  getStoredLanguage: jest.fn().mockResolvedValue('en'),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'game.record': `Record: ${options?.record ?? '—'}`,
        'game.start': 'Start Game',
        'settings.title': 'Settings',
      };
      return translations[key] || key;
    },
  }),
}));

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('hooks/useRecord', () => {
  let mockReturn = {
    record: 1000,
    setRecord: jest.fn(),
    isLoading: false,
  };

  return {
    useRecord: () => mockReturn,
    __setMockReturnValue: (value: unknown) => {
      mockReturn = value as typeof mockReturn;
    },
  };
});

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('MenuScreen', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD render all main sections', async () => {
      component = renderWithTheme(<MenuScreen />);
      await waitFor(() => {
        expect(component.getByTestId('header-container')).toBeTruthy();
        expect(component.getByTestId('center-container')).toBeTruthy();
        expect(component.getByTestId('footer-container')).toBeTruthy();
      });
    });

    test('SHOULD render title with record value', async () => {
      component = renderWithTheme(<MenuScreen />);
      await waitFor(() => {
        expect(component.getByText('Record: 1000')).toBeTruthy();
      });
    });

    test('SHOULD render start button with correct text', async () => {
      component = renderWithTheme(<MenuScreen />);
      await waitFor(() => {
        expect(component.getByText('Start Game')).toBeTruthy();
      });
    });

    test('SHOULD render settings button with correct text', async () => {
      component = renderWithTheme(<MenuScreen />);
      await waitFor(() => {
        expect(component.getByText('Settings')).toBeTruthy();
      });
    });
  });

  describe('rendering with undefined record', () => {
    beforeEach(() => {
      const useRecordMock = require('hooks/useRecord');
      useRecordMock.__setMockReturnValue({
        record: undefined,
        setRecord: jest.fn(),
        isLoading: false,
      });
    });

    afterEach(() => {
      const useRecordMock = require('hooks/useRecord');
      useRecordMock.__setMockReturnValue({
        record: 1000,
        setRecord: jest.fn(),
        isLoading: false,
      });
    });

    test('SHOULD render title with fallback dash WHEN record is undefined', async () => {
      component = renderWithTheme(<MenuScreen />);
      await waitFor(() => {
        expect(component.getByText('Record: —')).toBeTruthy();
      });
    });
  });

  describe('behavior', () => {
    test('SHOULD navigate to Game WHEN pressing start button', async () => {
      component = renderWithTheme(<MenuScreen />);
      const startButton = await waitFor(() =>
        component.getByText('Start Game'),
      );
      fireEvent.press(startButton);
      expect(mockNavigate).toHaveBeenCalledWith('Game');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('SHOULD navigate to Settings WHEN pressing settings button', async () => {
      component = renderWithTheme(<MenuScreen />);
      const settingsButton = await waitFor(() =>
        component.getByText('Settings'),
      );
      fireEvent.press(settingsButton);
      expect(mockNavigate).toHaveBeenCalledWith('Settings');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('SHOULD call navigation only once per button press', async () => {
      component = renderWithTheme(<MenuScreen />);
      const startButton = await waitFor(() =>
        component.getByText('Start Game'),
      );
      fireEvent.press(startButton);
      fireEvent.press(startButton);
      expect(mockNavigate).toHaveBeenCalledTimes(2);
    });
  });
});
