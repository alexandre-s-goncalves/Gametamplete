import { render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import * as S from './MenuScreen.styles';

const mockTheme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    card: '#f0f0f0',
    border: '#cccccc',
    text: '#000000',
    primary: '#007AFF',
  },
};

describe('MenuScreen styles', () => {
  const renderWithTheme = (component: React.ReactElement) =>
    render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);

  test('SHOULD render Background with image and cover resize mode', () => {
    const { toJSON } = renderWithTheme(
      <S.Background>
        <S.Overlay />
      </S.Background>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render ButtonSettings with secondary variant and white text', () => {
    const { toJSON } = renderWithTheme(
      <S.ButtonSettings title="Settings" onPress={() => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render ButtonStart with white text', () => {
    const { toJSON } = renderWithTheme(
      <S.ButtonStart title="Start Game" onPress={() => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render ButtonWrapper with 70% width and vertical margin', () => {
    const { toJSON } = renderWithTheme(
      <S.ButtonWrapper>
        <S.ButtonStart title="Button" onPress={() => {}} />
      </S.ButtonWrapper>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render CenterContainer with flex 1 and centered content', () => {
    const { toJSON } = renderWithTheme(
      <S.CenterContainer testID="center-container" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render FooterContainer with absolute positioning at bottom', () => {
    const { toJSON } = renderWithTheme(
      <S.FooterContainer testID="footer-container" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render HeaderContainer with absolute positioning at top', () => {
    const { toJSON } = renderWithTheme(
      <S.HeaderContainer testID="header-container" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Overlay with dark semi-transparent background', () => {
    const { toJSON } = renderWithTheme(<S.Overlay testID="overlay" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('SHOULD render Title with semibold variant, big size and white color', () => {
    const { toJSON } = renderWithTheme(
      <S.Title testID="title">Record: 1000</S.Title>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
