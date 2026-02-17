import { render } from '@testing-library/react-native';
import { LanguageContext } from 'providers/LanguageProvider/LanguageProvider';
import React from 'react';
import { Text } from 'react-native';
import { AppLanguage } from 'types';
import { useLanguage } from './useAppLanguage';

jest.mock('expo-localization', () => ({ locale: 'en', locales: ['en'] }));

const TestComponent = () => {
  const { language, isLoading } = useLanguage();
  return (
    <Text testID="language-value">{isLoading ? 'loading' : language}</Text>
  );
};

describe('useAppLanguage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD return context value WHEN provided by LanguageContext', () => {
      const mockContextValue = {
        language: 'en' as AppLanguage,
        changeLanguage: jest.fn(),
        isLoading: false,
      };

      const { getByTestId } = render(
        <LanguageContext.Provider value={mockContextValue}>
          <TestComponent />
        </LanguageContext.Provider>,
      );

      expect(getByTestId('language-value').props.children).toBe('en');
    });

    test('SHOULD show loading WHEN isLoading is true', () => {
      const mockContextValue = {
        language: 'pt' as AppLanguage,
        changeLanguage: jest.fn(),
        isLoading: true,
      };

      const { getByTestId } = render(
        <LanguageContext.Provider value={mockContextValue}>
          <TestComponent />
        </LanguageContext.Provider>,
      );

      expect(getByTestId('language-value').props.children).toBe('loading');
    });
  });

  describe('behavior', () => {
    test('SHOULD call changeLanguage WHEN invoked from context', () => {
      const mockChangeLanguage = jest.fn();
      const mockContextValue = {
        language: 'pt' as AppLanguage,
        changeLanguage: mockChangeLanguage,
        isLoading: false,
      };

      const TestComponentWithAction = () => {
        const { language, changeLanguage } = useLanguage();
        changeLanguage('en' as AppLanguage);
        return <Text testID="language-value">{language}</Text>;
      };

      render(
        <LanguageContext.Provider value={mockContextValue}>
          <TestComponentWithAction />
        </LanguageContext.Provider>,
      );

      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });
  });
});
