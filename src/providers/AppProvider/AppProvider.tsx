import { useAppFonts } from 'hooks/useAppFonts';
import { AppThemeProvider } from '../AppThemeProvider';
import { LanguageProvider } from '../LanguageProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <AppThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AppThemeProvider>
  );
}
