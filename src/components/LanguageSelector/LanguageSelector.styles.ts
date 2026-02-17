import { Text } from 'components/Text';
import { colors } from 'resources/colors';
import { spacing } from 'resources/spacing';
import styled from 'styled-components/native';

export const Backdrop = styled.Pressable({
  backgroundColor: colors.black80percent,
  flex: 1,
  justifyContent: 'center',
});

export const Container = styled.View({
  marginTop: spacing.medium,
});

export const Label = styled(Text)(({ theme }) => ({
  color: theme.colors.text,
  marginBottom: spacing.small,
  opacity: 0.7,
}));

export const ModalContent = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.card,
  borderRadius: 12,
  margin: spacing.medium,
  padding: spacing.medium,
}));

export const Option = styled.Pressable({
  paddingVertical: spacing.small,
});

export const OptionText = styled(Text)(({ theme }) => ({
  color: theme.colors.text,
}));

export const SelectedButton = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.card,
  borderColor: theme.colors.border,
  borderRadius: 8,
  borderWidth: 1,
  padding: spacing.medium,
}));

export const SelectedText = styled(Text)(({ theme }) => ({
  color: theme.colors.text,
}));
