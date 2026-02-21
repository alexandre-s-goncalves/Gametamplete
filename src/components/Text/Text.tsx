import React from 'react';
import { TextProps } from 'react-native';
import { Size, StyledText, Variant } from './Text.styles';

export interface PropsText extends TextProps {
  variant?: Variant;
  size?: Size;
  color?: string;
}

export const Text = ({
  children,
  variant = 'regular',
  size = 'small',
  color,
  style,
  ...rest
}: PropsText) => {
  return (
    <StyledText
      $variant={variant}
      $size={size}
      $color={color}
      style={style}
      {...rest}
    >
      {children}
    </StyledText>
  );
};
