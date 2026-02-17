import React, { createContext, useEffect, useState } from 'react';
import { AppLanguage } from 'types';
import { changeAppLanguage, getStoredLanguage } from '../../i18n';

interface LanguageContextData {
  language: AppLanguage;
  changeLanguage: (lang: AppLanguage) => Promise<void>;
  isLoading: boolean;
}

export const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData,
);

export const LanguageProvider = ({ children }: any) => {
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const stored = await getStoredLanguage();
      const lang = (stored as AppLanguage) || 'en';
      await changeAppLanguage(lang);
      setLanguage(lang);
      setIsLoading(false);
    }
    load();
  }, []);

  const changeLanguage = async (lang: AppLanguage) => {
    await changeAppLanguage(lang);
    setLanguage(lang);
  };

  if (isLoading) return null;

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
