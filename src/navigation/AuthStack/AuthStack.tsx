import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logout from '~components/customs/Logout';
import ThemeToggle from '~components/customs/ThemeToggle';
import LoginScreen from '~screens/LoginScreen';
import RegisterScreen from '~screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <Logout />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}
