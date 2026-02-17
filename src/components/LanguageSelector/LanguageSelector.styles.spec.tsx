import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as S from './LanguageSelector.styles';

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

describe('LanguageSelector styles', () => {
  const renderWithTheme = (component: React.ReactElement) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('SHOULD render Backdrop with correct background and layout', () => {
    const { toJSON } = renderWithTheme(<S.Backdrop />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Container with marginTop', () => {
    const { toJSON } = renderWithTheme(<S.Container />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Label WHEN theme is provided', () => {
    const { toJSON } = renderWithTheme(<S.Label>Label</S.Label>);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render ModalContent with background and padding', () => {
    const { toJSON } = renderWithTheme(<S.ModalContent />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Option with vertical padding', () => {
    const { toJSON } = renderWithTheme(<S.Option />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render OptionText with theme color', () => {
    const { toJSON } = renderWithTheme(<S.OptionText>Option</S.OptionText>);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render SelectedButton with border and padding', () => {
    const { toJSON } = renderWithTheme(<S.SelectedButton />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render SelectedText with theme color', () => {
    const { toJSON } = renderWithTheme(
      <S.SelectedText>Selected</S.SelectedText>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
