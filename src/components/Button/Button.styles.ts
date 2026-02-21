import styled from 'styled-components/native';
import { Text } from '../Text';
export type Variant = 'primary' | 'secondary';

interface Props {
  $variant?: Variant;
  $disabled?: boolean;
}

export const Container = styled.TouchableOpacity<Props>(
  ({ theme, $variant = 'primary', disabled }) => ({
    activeOpacity: 0.8,
    backgroundColor:
      $variant === 'primary' ? theme.colors.primary : 'transparent',
    opacity: disabled ? 0.6 : 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: $variant === 'secondary' ? 1 : 0,
    borderColor: $variant === 'secondary' ? theme.colors.border : 'transparent',
  }),
);

export const Label = styled(Text)({
  size: 'small',
  variant: 'semibold',
});
