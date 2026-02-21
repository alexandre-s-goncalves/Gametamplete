import React from 'react';
import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';
import { PropsText } from '../Text';
import * as S from './Button.styles';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: S.Variant;
  disabled?: boolean;
  testID?: string;
  textProps?: PropsText;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled,
  textProps,
  testID,
  ...restProps
}: Props) => {
  return (
    <S.Container
      onPress={onPress}
      $variant={variant}
      $disabled={disabled}
      disabled={disabled}
      testID={testID}
      {...restProps}
    >
      <S.Label {...textProps}>{title}</S.Label>
    </S.Container>
  );
};
