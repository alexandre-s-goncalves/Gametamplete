import { Text } from 'components/Text';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from 'resources/spacing';
import styled from 'styled-components/native';

export const SafeArea = styled(SafeAreaView)(({ theme }) => ({
  backgroundColor: theme.colors.background,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
}));

export const BackPlaceholder = styled.View({
  width: 60,
});

export const BackText = styled(Text).attrs({
  size: 'xsmall',
})``;

export const Container = styled.View(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.card,
  borderBottomColor: theme.colors.border,
  borderBottomWidth: 1,
  flexDirection: 'row',
  height: 56,
  justifyContent: 'space-between',
  paddingHorizontal: spacing.medium,
}));

export const Title = styled(Text).attrs({
  size: 'medium',
})``;
