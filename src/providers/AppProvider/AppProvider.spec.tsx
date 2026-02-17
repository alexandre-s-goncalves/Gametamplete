import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { AppProvider } from './AppProvider';

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en' }],
  locale: 'en',
  locales: ['en'],
}));

jest.mock('../../i18n', () => ({
  changeAppLanguage: jest.fn().mockResolvedValue(undefined),
  getStoredLanguage: jest.fn().mockResolvedValue('en'),
}));

jest.mock('hooks/useAppFonts', () => ({
  useAppFonts: jest.fn(),
}));

import { useAppFonts } from 'hooks/useAppFonts';

const TestComponent = () => <Text testID="child">Hello</Text>;

describe('AppProvider', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  test('SHOULD render children WHEN fonts are loaded', async () => {
    (useAppFonts as jest.Mock).mockReturnValue(true);

    component = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    const child = await waitFor(() => component.getByTestId('child'));
    expect(child.props.children).toBe('Hello');
  });

  test('SHOULD return null WHEN fonts are not loaded', () => {
    (useAppFonts as jest.Mock).mockReturnValue(false);

    component = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    expect(component.queryByTestId('child')).toBeNull();
  });
});
