import { render } from '@testing-library/react-native';
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

describe('Text styles snapshots', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);

  test.each`
    variant       | size
    ${'regular'}  | ${'xxsmall'}
    ${'semibold'} | ${'xxsmall'}
    ${'bold'}     | ${'xxsmall'}
    ${'regular'}  | ${'xsmall'}
    ${'semibold'} | ${'xsmall'}
    ${'bold'}     | ${'xsmall'}
    ${'regular'}  | ${'small'}
    ${'semibold'} | ${'small'}
    ${'bold'}     | ${'small'}
    ${'regular'}  | ${'medium'}
    ${'semibold'} | ${'medium'}
    ${'bold'}     | ${'medium'}
    ${'regular'}  | ${'big'}
    ${'semibold'} | ${'big'}
    ${'bold'}     | ${'big'}
  `(
    'renders correctly with variant=$variant and size=$size',
    ({ variant, size }) => {
      const { toJSON } = renderWithTheme(
        <Text variant={variant} size={size}>
          Sample
        </Text>,
      );
      expect(toJSON()).toMatchSnapshot();
    },
  );

  test('applies custom color when provided', () => {
    const { toJSON } = renderWithTheme(
      <Text variant="regular" size="small" color="#FF0000">
        Colored
      </Text>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
