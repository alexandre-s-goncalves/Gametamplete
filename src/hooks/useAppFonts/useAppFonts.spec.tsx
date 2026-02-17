import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { useAppFonts } from './useAppFonts';

const mockUseFonts = jest.fn();

jest.mock('expo-font', () => ({
  useFonts: (fonts: Record<string, any>) => mockUseFonts(fonts),
}));

const TestComponent = () => {
  const fontsLoaded = useAppFonts();
  return (
    <Text testID="fonts-status">{fontsLoaded ? 'loaded' : 'not-loaded'}</Text>
  );
};

describe('useAppFonts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD return false WHEN fonts are not loaded', () => {
      mockUseFonts.mockReturnValue([false]);
      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('fonts-status').props.children).toBe('not-loaded');
    });

    test('SHOULD return true WHEN fonts are loaded', () => {
      mockUseFonts.mockReturnValue([true]);
      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('fonts-status').props.children).toBe('loaded');
    });
  });

  describe('behavior', () => {
    test('SHOULD call useFonts with correct font map', () => {
      mockUseFonts.mockReturnValue([true]);
      render(<TestComponent />);
      expect(mockUseFonts).toHaveBeenCalledWith({
        'Inter-Regular': expect.anything(),
        'Inter-SemiBold': expect.anything(),
        'Inter-Bold': expect.anything(),
      });
    });
  });
});
