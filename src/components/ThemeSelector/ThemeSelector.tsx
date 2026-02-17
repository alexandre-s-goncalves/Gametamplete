import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';

import { useAppTheme } from 'hooks/useAppTheme';
import type { AppThemeMode } from 'types';

import * as S from './ThemeSelector.styles';

type OptionType = {
  label: string;
  value: AppThemeMode;
};

export const ThemeSelector = () => {
  const { t } = useTranslation('screens');
  const { changeTheme, themeMode } = useAppTheme();
  const [visible, setVisible] = useState(false);

  const options: OptionType[] = useMemo(
    () => [
      { label: `🖥 ${t('settings.themeSystem')}`, value: 'system' },
      { label: `🌞 ${t('settings.themeLight')}`, value: 'light' },
      { label: `🌙 ${t('settings.themeDark')}`, value: 'dark' },
    ],
    [t],
  );

  const selectedLabel = options.find(
    option => option.value === themeMode,
  )?.label;

  return (
    <S.Container testID="theme-selector">
      <S.Label testID="theme-label">{t('settings.selectTheme')}</S.Label>
      <S.SelectedButton
        testID="selected-button"
        onPress={() => setVisible(true)}
      >
        <S.SelectedText testID="selected-text">{selectedLabel}</S.SelectedText>
      </S.SelectedButton>
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        testID="theme-modal"
      >
        <S.Backdrop testID="backdrop" onPress={() => setVisible(false)}>
          <S.ModalContent testID="modal-content">
            {options.map(option => (
              <S.Option
                key={option.value}
                testID={`option-${option.value}`}
                onPress={() => {
                  changeTheme(option.value);
                  setVisible(false);
                }}
              >
                <S.OptionText testID={`option-text-${option.value}`}>
                  {option.label}
                </S.OptionText>
              </S.Option>
            ))}
          </S.ModalContent>
        </S.Backdrop>
      </Modal>
    </S.Container>
  );
};
