import { useAppFonts } from 'hooks/useAppFonts';
import { AppThemeProvider } from '../AppThemeProvider';
import { LanguageProvider } from '../LanguageProvider';
import { RecordProvider } from '../RecordProvider';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const fontsLoaded = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <AppThemeProvider>
      <LanguageProvider>
        <RecordProvider>{children}</RecordProvider>
      </LanguageProvider>
    </AppThemeProvider>
  );
}
