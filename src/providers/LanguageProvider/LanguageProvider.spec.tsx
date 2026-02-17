import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Button, Text } from 'react-native';
import { AppLanguage } from 'types';
import { LanguageContext, LanguageProvider } from './LanguageProvider';

jest.mock('../../i18n', () => ({
  getStoredLanguage: jest.fn(),
  changeAppLanguage: jest.fn(),
}));

import { changeAppLanguage, getStoredLanguage } from '../../i18n';

const TestComponent = () => {
  const { language, changeLanguage, isLoading } =
    React.useContext(LanguageContext);
  return (
    <>
      <Text testID="language-value">{isLoading ? 'loading' : language}</Text>
      <Button
        testID="change-language"
        title="Change Language"
        onPress={() => changeLanguage('pt' as AppLanguage)}
      />
    </>
  );
};

describe('LanguageProvider', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  test('SHOULD load stored language on mount', async () => {
    (getStoredLanguage as jest.Mock).mockResolvedValue('pt');
    (changeAppLanguage as jest.Mock).mockResolvedValue(undefined);

    component = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    const languageValue = await waitFor(() =>
      component.getByTestId('language-value'),
    );
    expect(languageValue.props.children).toBe('pt');
    expect(changeAppLanguage).toHaveBeenCalledWith('pt');
  });

  test('SHOULD fallback to default language WHEN no stored value', async () => {
    (getStoredLanguage as jest.Mock).mockResolvedValue(null);
    (changeAppLanguage as jest.Mock).mockResolvedValue(undefined);

    component = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    const languageValue = await waitFor(() =>
      component.getByTestId('language-value'),
    );
    expect(languageValue.props.children).toBe('en');
  });

  test('SHOULD change language WHEN changeLanguage is called', async () => {
    (getStoredLanguage as jest.Mock).mockResolvedValue('en');
    (changeAppLanguage as jest.Mock).mockResolvedValue(undefined);

    component = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    await waitFor(() =>
      expect(component.getByTestId('language-value').props.children).toBe('en'),
    );

    fireEvent.press(component.getByTestId('change-language'));

    await waitFor(() => {
      expect(component.getByTestId('language-value').props.children).toBe('pt');
      expect(changeAppLanguage).toHaveBeenCalledWith('pt');
    });
  });
});
