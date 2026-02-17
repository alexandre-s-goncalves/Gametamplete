import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import * as S from './Header.styles';

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const canGoBack = navigation.canGoBack();

  return (
    <S.SafeArea edges={['top']}>
      <S.Container>
        {canGoBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            testID="back-button"
          >
            <S.BackText>{`< ${t('common.back')}`}</S.BackText>
          </TouchableOpacity>
        ) : (
          <S.BackPlaceholder testID="back-placeholder" />
        )}
        <S.Title testID="header-title">{title}</S.Title>
        <S.BackPlaceholder testID="back-placeholder" />
      </S.Container>
    </S.SafeArea>
  );
};
