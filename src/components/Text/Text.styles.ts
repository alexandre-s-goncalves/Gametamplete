import fonts from 'resources/fonts';
import { typography } from 'resources/typography';
import styled from 'styled-components/native';

export type Variant = 'regular' | 'semibold' | 'bold';
export type Size = keyof typeof typography.size;

interface StyledProps {
  $variant: Variant;
  $size: Size;
  $color?: string;
}

export const StyledText = styled.Text.attrs<StyledProps>(({ $size }) => ({
  style: { lineHeight: typography.lineHeight[$size] },
}))<StyledProps>(({ $variant, $size, $color, theme }) => {
  let fontFamily;
  let fontWeight: '400' | '600' | '700';

  switch ($variant) {
    case 'bold':
      fontFamily = fonts.InterBold;
      fontWeight = '700';
      break;
    case 'semibold':
      fontFamily = fonts.InterSemiBold;
      fontWeight = '600';
      break;
    default:
      fontFamily = fonts.InterRegular;
      fontWeight = '400';
      break;
  }

  return {
    fontFamily,
    fontWeight,
    fontSize: typography.size[$size],
    color: $color ?? theme.colors.text,
  };
});
