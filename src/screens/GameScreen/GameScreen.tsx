import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import i18n from '../../i18n';

import { ButtonText, Container, StartButton, Title } from './GameScreen.styles';

export function GameScreen() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  async function saveData() {
    await AsyncStorage.setItem('@username', name);
    alert(t('savedAlert'));
  }

  async function loadData() {
    const value = await AsyncStorage.getItem('@username');
    setSavedName(value);
  }

  async function toggleLanguage() {
    const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
    await i18n.changeLanguage(newLang);
    await AsyncStorage.setItem('@language', newLang);
    setCurrentLanguage(newLang);
  }

  async function loadLanguage() {
    const savedLang = await AsyncStorage.getItem('@language');
    if (savedLang) {
      await i18n.changeLanguage(savedLang);
      setCurrentLanguage(savedLang);
    }
  }

  useEffect(() => {
    loadData();
    loadLanguage();
  }, []);

  return (
    <Container>
      <Title>{t('welcome')}</Title>

      <TextInput
        placeholder={t('placeholder')}
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: '#fff',
          width: '80%',
          padding: 10,
          marginTop: 20,
        }}
      />

      <StartButton onPress={saveData}>
        <ButtonText>{t('save')}</ButtonText>
      </StartButton>

      <StartButton onPress={loadData}>
        <ButtonText>{t('load')}</ButtonText>
      </StartButton>

      <StartButton onPress={toggleLanguage}>
        <ButtonText>
          {currentLanguage === 'pt'
            ? 'Switch to English'
            : 'Mudar para Português'}
        </ButtonText>
      </StartButton>

      {savedName && (
        <Title style={{ marginTop: 20 }}>
          {t('savedName')} {savedName}
        </Title>
      )}
    </Container>
  );
}

/*@types/jest@30.0.0 - expected version: 29.5.14
  //jest@30.2.0 - expected version: ~29.7.0*/
