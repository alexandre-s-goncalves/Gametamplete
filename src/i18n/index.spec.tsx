import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { AppLanguage } from 'types';
import {
    changeAppLanguage,
    getStoredLanguage,
    LANGUAGE_KEY,
    loadInitialLanguage,
} from './index';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

jest.mock('i18next', () => ({
  changeLanguage: jest.fn(),
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
}));

describe('i18n', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getStoredLanguage SHOULD return stored language', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('pt');
    const lang = await getStoredLanguage();
    expect(lang).toBe('pt');
  });

  test('getStoredLanguage SHOULD fallback to device language', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (Localization.getLocales as jest.Mock).mockReturnValue([
      { languageCode: 'fr' },
    ]);
    const lang = await getStoredLanguage();
    expect(lang).toBe('fr');
  });

  test('getStoredLanguage SHOULD fallback to en WHEN no stored or device language', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (Localization.getLocales as jest.Mock).mockReturnValue([
      { languageCode: 'xx' },
    ]);
    const lang = await getStoredLanguage();
    expect(lang).toBe('en');
  });

  test('changeAppLanguage SHOULD persist and call i18n', async () => {
    await changeAppLanguage('es' as AppLanguage);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(LANGUAGE_KEY, 'es');
    expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
  });

  test('loadInitialLanguage SHOULD call getStoredLanguage and persist', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('pt');
    const lang = await getStoredLanguage();
    await loadInitialLanguage();
    expect(i18n.changeLanguage).toHaveBeenCalledWith(lang);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(LANGUAGE_KEY, lang);
  });
});
