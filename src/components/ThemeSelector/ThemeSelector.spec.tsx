import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { ThemeSelector } from './ThemeSelector';

const mockChangeTheme = jest.fn();

jest.mock('hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    themeMode: 'light',
    changeTheme: mockChangeTheme,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: (ns?: string) => ({
    t: (key: string) => {
      if (ns === 'screens' && key === 'settings.selectTheme')
        return 'Select Theme';
      if (ns === 'screens' && key === 'settings.themeSystem') return 'System';
      if (ns === 'screens' && key === 'settings.themeLight') return 'Light';
      if (ns === 'screens' && key === 'settings.themeDark') return 'Dark';
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

describe('ThemeSelector', () => {
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
      const { getByTestId } = renderWithTheme(<ThemeSelector />);
      expect(getByTestId('theme-selector')).toBeTruthy();
      expect(getByTestId('theme-label').props.children).toBe('Select Theme');
    });

    test('SHOULD render selected button with current theme', () => {
      const { getByTestId } = renderWithTheme(<ThemeSelector />);
      expect(getByTestId('selected-button')).toBeTruthy();
      expect(getByTestId('selected-text').props.children).toContain('Light');
    });

    test('SHOULD NOT show modal initially', () => {
      const { queryByTestId } = renderWithTheme(<ThemeSelector />);
      expect(queryByTestId('backdrop')).toBeNull();
    });
  });

  describe('behavior', () => {
    test('SHOULD open modal WHEN selected button is pressed', () => {
      const { getByTestId } = renderWithTheme(<ThemeSelector />);
      fireEvent.press(getByTestId('selected-button'));
      expect(getByTestId('backdrop')).toBeTruthy();
      expect(getByTestId('option-system')).toBeTruthy();
      expect(getByTestId('option-dark')).toBeTruthy();
    });

    test('SHOULD close modal WHEN backdrop is pressed', () => {
      const { getByTestId, queryByTestId } = renderWithTheme(<ThemeSelector />);
      fireEvent.press(getByTestId('selected-button'));
      fireEvent.press(getByTestId('backdrop'));
      expect(queryByTestId('backdrop')).toBeNull();
    });

    test('SHOULD call changeTheme AND close modal WHEN option is pressed', () => {
      const { getByTestId, queryByTestId } = renderWithTheme(<ThemeSelector />);
      fireEvent.press(getByTestId('selected-button'));
      fireEvent.press(getByTestId('option-dark'));
      expect(mockChangeTheme).toHaveBeenCalledWith('dark');
      expect(queryByTestId('backdrop')).toBeNull();
    });
  });
});
