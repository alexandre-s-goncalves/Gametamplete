import { Button } from '@/src/components/Button';
import { colors } from '@/src/resources';
import { Text as AppText } from 'components/Text';
import styled from 'styled-components/native';

export const Background = styled.ImageBackground.attrs(() => ({
  source: require('../../assets/images/image-menu.png'),
  resizeMode: 'cover',
}))(() => ({
  flex: 1,
}));

export const ButtonSettings = styled(Button).attrs(() => ({
  variant: 'secondary',
  textProps: { color: colors.white },
}))({
  width: '100%',
  borderColor: colors.white,
});

export const ButtonStart = styled(Button).attrs(() => ({
  textProps: { color: colors.white },
}))({
  width: '100%',
  background: colors.grayLight,
});

export const ButtonWrapper = styled.View({
  width: '70%',
  marginVertical: 8,
});

export const CenterContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const FooterContainer = styled.View({
  position: 'absolute',
  bottom: 40,
  left: 0,
  right: 0,
  alignItems: 'center',
});

export const HeaderContainer = styled.View({
  position: 'absolute',
  top: 48,
  left: 0,
  right: 0,
  alignItems: 'center',
});

export const Overlay = styled.View(() => ({
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.35)',
}));

export const Title = styled(AppText).attrs(() => ({
  variant: 'semibold',
  size: 'big',
  color: colors.white,
}))(() => ({
  marginBottom: 8,
}));
