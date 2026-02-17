import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptCommon from './locales/pt/common.json';
import ptComponents from './locales/pt/components.json';
import ptScreens from './locales/pt/screens.json';

import enCommon from './locales/en/common.json';
import enComponents from './locales/en/components.json';
import enScreens from './locales/en/screens.json';

import frCommon from './locales/fr/common.json';
import frComponents from './locales/fr/components.json';
import frScreens from './locales/fr/screens.json';

import { LANGUAGES } from 'constants/languages';
import { AppLanguage } from 'types';
import esCommon from './locales/es/common.json';
import esComponents from './locales/es/components.json';
import esScreens from './locales/es/screens.json';

const resources = {
  pt: {
    common: ptCommon,
    screens: ptScreens,
    components: ptComponents,
  },
  en: {
    common: enCommon,
    screens: enScreens,
    components: enComponents,
  },
  fr: {
    common: frCommon,
    screens: frScreens,
    components: frComponents,
  },
  es: {
    common: esCommon,
    screens: esScreens,
    components: esComponents,
  },
};

export const LANGUAGE_KEY = '@app_language';

export async function getStoredLanguage(): Promise<AppLanguage> {
  const stored = await AsyncStorage.getItem(LANGUAGE_KEY);

  if (stored && stored in LANGUAGES) {
    return stored as AppLanguage;
  }

  const deviceLang = Localization.getLocales()[0]?.languageCode;

  if (deviceLang && deviceLang in LANGUAGES) {
    return deviceLang as AppLanguage;
  }

  return 'en';
}

export async function changeAppLanguage(lang: AppLanguage) {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);
}

export async function loadInitialLanguage() {
  const lang = await getStoredLanguage();
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'screens', 'components'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
