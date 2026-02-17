import { Text } from 'components/Text';
import { spacing } from 'resources/spacing';
import styled from 'styled-components/native';

export const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.card,
  padding: spacing.medium,
  height: '100%',
}));

export const Title = styled(Text).attrs(({ theme }) => ({
  variant: 'bold',
  size: 'medium',
  color: theme.colors.text,
}))`
  margin-bottom: 20px;
`;
