import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootDrawer from '~navigation/RootDrawer';
import CartScreen from '~screens/CartScreen';
import SettingsScreen from '~screens/SettingsScreen';
import { RootStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name='RootDrawer' component={RootDrawer} options={{ headerShown: false }} />
      <Stack.Screen name='CartScreen' component={CartScreen} options={{ title: 'Your cart' }} />
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
};

export default RootStack;
