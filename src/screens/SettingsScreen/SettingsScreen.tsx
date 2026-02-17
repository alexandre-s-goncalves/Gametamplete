import { LanguageSelector } from 'components/LanguageSelector';
import { ThemeSelector } from 'components/ThemeSelector';
import { useTranslation } from 'react-i18next';
import { Container, Title } from './SettingsScreen.styles';

export const SettingsScreen = () => {
  const { t } = useTranslation('screens');

  return (
    <Container>
      <Title>⚙️ {t('settings.title')}</Title>
      <LanguageSelector />
      <ThemeSelector />
    </Container>
  );
};
