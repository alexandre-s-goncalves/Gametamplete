import { render } from '@testing-library/react-native';
import React from 'react';
import { lightTheme } from 'resources/themes/light';
import { ThemeProvider } from 'styled-components/native';
import { Container, Title } from './SettingsScreen.styles';

describe('Settings Screen styles', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

  test('SHOULD match snapshot for Container', () => {
    const tree = renderWithTheme(<Container testID="container" />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('SHOULD match snapshot for Title', () => {
    const tree = renderWithTheme(<Title>Settings</Title>);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
