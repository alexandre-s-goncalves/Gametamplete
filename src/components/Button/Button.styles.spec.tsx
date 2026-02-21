import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as S from './Button.styles';

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

describe('Button styles', () => {
  const renderWithTheme = (component: React.ReactElement) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('SHOULD render Container with primary variant WHEN no variant is passed', () => {
    const { toJSON } = renderWithTheme(
      <S.Container>
        <S.Label>Primary Button</S.Label>
      </S.Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Container with primary variant', () => {
    const { toJSON } = renderWithTheme(
      <S.Container $variant="primary">
        <S.Label>Primary Button</S.Label>
      </S.Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Container with secondary variant', () => {
    const { toJSON } = renderWithTheme(
      <S.Container $variant="secondary">
        <S.Label>Secondary Button</S.Label>
      </S.Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Container with disabled state and primary variant', () => {
    const { toJSON } = renderWithTheme(
      <S.Container $variant="primary" disabled>
        <S.Label>Disabled Button</S.Label>
      </S.Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Container with disabled state and secondary variant', () => {
    const { toJSON } = renderWithTheme(
      <S.Container $variant="secondary" disabled>
        <S.Label>Disabled Button</S.Label>
      </S.Container>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Label with text', () => {
    const { toJSON } = renderWithTheme(<S.Label>Label Text</S.Label>);
    expect(toJSON()).toMatchSnapshot();
  });
});
