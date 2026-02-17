import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { LanguageSelector } from './LanguageSelector';

const mockChangeLanguage = jest.fn();

jest.mock('hooks/useAppLanguage', () => ({
  useLanguage: () => ({
    language: 'en',
    changeLanguage: mockChangeLanguage,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: (ns?: string) => ({
    t: (key: string) => {
      if (ns === 'screens' && key === 'settings.selectLanguage')
        return 'Select Language';
      if (ns === 'common' && key.startsWith('languages.')) {
        const code = key.split('.')[1];
        return code === 'en' ? 'English' : code;
      }
      return key;
    },
  }),
}));

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

describe('LanguageSelector', () => {
  let component: RenderAPI;

  const renderWithTheme = (ui: React.ReactElement) => {
    component = render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
    return component;
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD render container and label', () => {
      const { getByTestId } = renderWithTheme(<LanguageSelector />);
      expect(getByTestId('language-selector')).toBeTruthy();
      expect(getByTestId('language-label').props.children).toBe(
        'Select Language',
      );
    });

    test('SHOULD render selected button with current language', () => {
      const { getByTestId } = renderWithTheme(<LanguageSelector />);
      expect(getByTestId('selected-button')).toBeTruthy();
      expect(getByTestId('selected-text').props.children).toContain('English');
    });

    test('SHOULD NOT show modal initially', () => {
      const { queryByTestId } = renderWithTheme(<LanguageSelector />);
      expect(queryByTestId('backdrop')).toBeNull();
    });
  });

  describe('behavior', () => {
    test('SHOULD open modal WHEN selected button is pressed', () => {
      const { getByTestId, queryByTestId } = renderWithTheme(
        <LanguageSelector />,
      );
      expect(queryByTestId('backdrop')).toBeNull();
      fireEvent.press(getByTestId('selected-button'));
      expect(getByTestId('backdrop')).toBeTruthy();
    });

    test('SHOULD close modal WHEN backdrop is pressed', () => {
      const { getByTestId, queryByTestId } = renderWithTheme(
        <LanguageSelector />,
      );
      fireEvent.press(getByTestId('selected-button'));
      fireEvent.press(getByTestId('backdrop'));
      expect(queryByTestId('backdrop')).toBeNull();
    });

    test('SHOULD call changeLanguage AND close modal WHEN option is pressed', () => {
      const { getByTestId, queryByTestId } = renderWithTheme(
        <LanguageSelector />,
      );
      fireEvent.press(getByTestId('selected-button'));
      fireEvent.press(getByTestId('option-en'));
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
      expect(queryByTestId('backdrop')).toBeNull();
    });
  });
});
