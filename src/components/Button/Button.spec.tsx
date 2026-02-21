import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Button } from './Button';

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

describe('Button component', () => {
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

  test('SHOULD render Button with title', () => {
    const { getByText } = renderWithTheme(<Button title="Click Me" />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  test('SHOULD call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Button title="Press Me" onPress={mockOnPress} testID="button-test" />,
    );
    const button = getByTestId('button-test');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  test('SHOULD render with primary variant', () => {
    const { getByText } = renderWithTheme(
      <Button title="Primary" variant="primary" />,
    );
    expect(getByText('Primary')).toBeTruthy();
  });

  test('SHOULD render with secondary variant', () => {
    const { getByText } = renderWithTheme(
      <Button title="Secondary" variant="secondary" />,
    );
    expect(getByText('Secondary')).toBeTruthy();
  });

  test('SHOULD NOT call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Button
        title="Disabled"
        disabled
        onPress={mockOnPress}
        testID="disabled-button"
      />,
    );
    const button = getByTestId('disabled-button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('SHOULD render with custom text props', () => {
    const { getByText } = renderWithTheme(
      <Button
        title="Custom Text"
        textProps={{ color: '#FF0000', size: 'medium' }}
      />,
    );
    expect(getByText('Custom Text')).toBeTruthy();
  });

  test('SHOULD render with testID', () => {
    const { getByTestId } = renderWithTheme(
      <Button title="Test Button" testID="my-button" />,
    );
    expect(getByTestId('my-button')).toBeTruthy();
  });

  test('SHOULD render disabled button with reduced opacity', () => {
    const { getByTestId } = renderWithTheme(
      <Button title="Disabled Style" disabled testID="disabled-style-button" />,
    );
    const button = getByTestId('disabled-style-button');
    expect(button).toBeTruthy();
    expect(button.props.style.opacity).toBe(0.6);
  });

  test('SHOULD render enabled button with full opacity', () => {
    const { getByTestId } = renderWithTheme(
      <Button title="Enabled Style" testID="enabled-style-button" />,
    );
    const button = getByTestId('enabled-style-button');
    expect(button).toBeTruthy();
    expect(button.props.style.opacity).toBe(1);
  });
});
