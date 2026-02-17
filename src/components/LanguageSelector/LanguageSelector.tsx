import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';

import { LANGUAGES } from 'constants/languages';
import { useLanguage } from 'hooks/useAppLanguage';
import type { AppLanguage } from 'types';

import * as S from './LanguageSelector.styles';

type OptionType = {
  label: string;
  value: AppLanguage;
};

export const LanguageSelector = () => {
  const { t } = useTranslation('screens');
  const { t: tCommon } = useTranslation('common');
  const { language, changeLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);

  const options: OptionType[] = useMemo(
    () =>
      (Object.keys(LANGUAGES) as AppLanguage[]).map(code => {
        return {
          value: code,
          label: `${LANGUAGES[code].flag} ${tCommon(`languages.${code}`)}`,
        };
      }),
    [tCommon],
  );

  const selectedLabel = options.find(
    option => option.value === language,
  )?.label;

  return (
    <S.Container testID="language-selector">
      <S.Label testID="language-label">{t('settings.selectLanguage')}</S.Label>
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
        testID="language-modal"
      >
        <S.Backdrop testID="backdrop" onPress={() => setVisible(false)}>
          <S.ModalContent testID="modal-content">
            {options.map(option => (
              <S.Option
                key={option.value}
                testID={`option-${option.value}`}
                onPress={() => {
                  changeLanguage(option.value);
                  setVisible(false);
                }}
              >
                <S.OptionText>{option.label}</S.OptionText>
              </S.Option>
            ))}
          </S.ModalContent>
        </S.Backdrop>
      </Modal>
    </S.Container>
  );
};
