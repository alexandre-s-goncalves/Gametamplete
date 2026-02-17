import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { Header } from 'components/Header';
import { MenuScreen } from 'screens/MenuScreen';
import { SettingsScreen } from 'screens/SettingsScreen';

export type RootStackParamList = {
  Menu: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { t } = useTranslation('screens');

  const routeTitleMap: Record<keyof RootStackParamList, string> = {
    Menu: 'game.welcome',
    Settings: 'settings.title',
  };

  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        header: () =>
          route.name === 'Settings' ? (
            <Header title={t(routeTitleMap[route.name])} />
          ) : null,
      })}
    >
      <Stack.Screen name="Menu" component={MenuScreen} />

      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
