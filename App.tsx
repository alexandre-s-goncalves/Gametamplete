import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from 'providers/AppProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStack } from 'routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
