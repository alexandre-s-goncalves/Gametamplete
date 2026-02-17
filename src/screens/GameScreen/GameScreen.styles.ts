import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
`;

export const StartButton = styled.Pressable`
  margin-top: 20px;
  padding: 12px 16px;
  background-color: #00ff88;
  border-radius: 8px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
`;
