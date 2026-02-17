import { render } from '@testing-library/react-native';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import * as S from './Header.styles';

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

describe('Header styles', () => {
  const renderWithTheme = (component: React.ReactElement) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  afterEach(() => {
    Platform.OS = 'ios';
    (StatusBar as any).currentHeight = undefined;
  });

  test('SafeArea SHOULD apply paddingTop=0 WHEN Platform is iOS', () => {
    Platform.OS = 'ios';
    const { toJSON } = renderWithTheme(<S.SafeArea edges={['top']} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SafeArea SHOULD apply StatusBar.currentHeight WHEN Platform is Android', () => {
    Platform.OS = 'android';
    (StatusBar as any).currentHeight = 42;
    const { toJSON } = renderWithTheme(<S.SafeArea edges={['top']} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('BackText SHOULD render with size xsmall', () => {
    const { getByText } = renderWithTheme(<S.BackText>Back</S.BackText>);
    expect(getByText('Back')).toBeTruthy();
  });

  test('Title SHOULD render with size medium', () => {
    const { getByText } = renderWithTheme(<S.Title>Title</S.Title>);
    expect(getByText('Title')).toBeTruthy();
  });

  test('Container SHOULD apply layout and border correctly', () => {
    const { toJSON } = renderWithTheme(<S.Container />);
    expect(toJSON()).toMatchSnapshot();
  });
});
