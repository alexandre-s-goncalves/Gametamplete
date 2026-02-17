import { LanguageContext } from 'providers/LanguageProvider/LanguageProvider';
import { useContext } from 'react';

export function useLanguage() {
  return useContext(LanguageContext);
}
