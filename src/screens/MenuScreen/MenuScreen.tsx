import { RootStackParamList } from '@/src/routes';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useRecord } from 'hooks/useRecord';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './MenuScreen.styles';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation('screens');
  const { record } = useRecord();

  return (
    <S.Background>
      <S.Overlay>
        <S.HeaderContainer testID="header-container">
          <S.Title>{t('game.record', { record: record ?? '—' })}</S.Title>
        </S.HeaderContainer>

        <S.CenterContainer testID="center-container">
          <S.ButtonWrapper>
            <S.ButtonStart
              title={t('game.start')}
              onPress={() => navigation.navigate('Game')}
            />
          </S.ButtonWrapper>
        </S.CenterContainer>

        <S.FooterContainer testID="footer-container">
          <S.ButtonWrapper>
            <S.ButtonSettings
              title={t('settings.title')}
              onPress={() => navigation.navigate('Settings')}
            />
          </S.ButtonWrapper>
        </S.FooterContainer>
      </S.Overlay>
    </S.Background>
  );
};
