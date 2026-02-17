import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { lightTheme } from 'resources/themes/light';
import { ThemeProvider } from 'styled-components/native';
import { SettingsScreen } from './SettingsScreen';

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
    t: (key: string) => {
      const translations: Record<string, string> = {
        'settings.title': 'Settings',
        'settings.selectLanguage': 'Select Language',
        'settings.selectTheme': 'Select Theme',
        'settings.themeSystem': 'System',
        'settings.themeLight': 'Light',
        'settings.themeDark': 'Dark',
        'languages.en': 'English',
        'languages.pt': 'Português',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('SettingsScreen', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD match snapshot', async () => {
      component = renderWithTheme(<SettingsScreen />);
      const tree = await waitFor(() => component.toJSON());
      expect(tree).toMatchSnapshot();
    });

    test('SHOULD render title and selectors', async () => {
      component = renderWithTheme(<SettingsScreen />);
      await waitFor(() => {
        expect(component.getByText(/Settings/)).toBeTruthy();
        expect(component.getByTestId('language-selector')).toBeTruthy();
        expect(component.getByTestId('theme-selector')).toBeTruthy();
      });
    });
  });

  describe('behavior', () => {
    test('SHOULD open language modal WHEN pressing selected button', async () => {
      component = renderWithTheme(<SettingsScreen />);
      const buttons = await waitFor(() =>
        component.getAllByTestId('selected-button'),
      );
      fireEvent.press(buttons[0]);
      const modal = await waitFor(() =>
        component.getByTestId('language-modal'),
      );
      expect(modal.props.visible).toBe(true);
    });

    test('SHOULD open theme modal WHEN pressing selected button', async () => {
      component = renderWithTheme(<SettingsScreen />);
      const buttons = await waitFor(() =>
        component.getAllByTestId('selected-button'),
      );
      fireEvent.press(buttons[1]);
      const modal = await waitFor(() => component.getByTestId('theme-modal'));
      expect(modal.props.visible).toBe(true);
    });
  });
});
