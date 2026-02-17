import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Header } from './Header';

const mockGoBack = jest.fn();
const mockCanGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    canGoBack: mockCanGoBack,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => (key === 'common.back' ? 'Back' : key),
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

describe('Header', () => {
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
    test('SHOULD render title text WHEN provided', () => {
      const { getByTestId } = renderWithTheme(<Header title="My Title" />);
      expect(getByTestId('header-title').props.children).toBe('My Title');
    });

    test('SHOULD render back button IF navigation.canGoBack returns true', () => {
      mockCanGoBack.mockReturnValue(true);
      const { getByTestId } = renderWithTheme(<Header title="Screen" />);
      expect(getByTestId('back-button')).toBeTruthy();
    });

    test('SHOULD NOT render back button WHEN navigation.canGoBack returns false', () => {
      mockCanGoBack.mockReturnValue(false);
      const { queryByTestId } = renderWithTheme(<Header title="Screen" />);
      expect(queryByTestId('back-button')).toBeNull();
    });

    test('SHOULD render two placeholders WHEN navigation.canGoBack returns false', () => {
      mockCanGoBack.mockReturnValue(false);
      const { getAllByTestId } = renderWithTheme(<Header title="Screen" />);
      expect(getAllByTestId('back-placeholder')).toHaveLength(2);
    });
  });

  describe('behavior', () => {
    test('SHOULD call navigation.goBack WHEN back button is pressed', () => {
      mockCanGoBack.mockReturnValue(true);
      const { getByTestId } = renderWithTheme(<Header title="Screen" />);
      fireEvent.press(getByTestId('back-button'));
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });
  });
});
