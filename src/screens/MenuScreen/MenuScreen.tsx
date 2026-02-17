import { RootStackParamList } from '@/src/routes';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, View } from 'react-native';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Ir para Configurações"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};
