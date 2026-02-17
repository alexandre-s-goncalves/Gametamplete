import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Text } from './Text';

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

describe('Text component', () => {
  let component: RenderAPI;

  const renderWithTheme = (ui: React.ReactElement) => {
    component = render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
    return component;
  };

  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  test('SHOULD render children text', () => {
    const { getByText } = renderWithTheme(<Text>Hello World</Text>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  test('SHOULD apply default props WHEN none are provided', () => {
    const { getByText } = renderWithTheme(<Text>Default</Text>);
    const element = getByText('Default');
    expect(element).toHaveStyle({ color: mockTheme.colors.text });
  });

  test('SHOULD apply custom color IF color prop is provided', () => {
    const { getByText } = renderWithTheme(
      <Text color="#FF0000">Custom Color</Text>,
    );
    expect(getByText('Custom Color')).toHaveStyle({ color: '#FF0000' });
  });

  test('SHOULD apply bold style WHEN variant="bold"', () => {
    const { getByText } = renderWithTheme(
      <Text variant="bold">Bold Text</Text>,
    );
    expect(getByText('Bold Text')).toHaveStyle({
      fontWeight: '700',
    });
  });

  test('SHOULD apply big size WHEN size="big"', () => {
    const { getByText } = renderWithTheme(<Text size="big">Big Text</Text>);
    expect(getByText('Big Text')).toHaveStyle({
      fontSize: 24,
    });
  });

  test('SHOULD NOT break WHEN style prop is passed', () => {
    const { getByText } = renderWithTheme(
      <Text style={{ margin: 10 }}>Styled Text</Text>,
    );
    expect(getByText('Styled Text')).toBeTruthy();
  });
});
