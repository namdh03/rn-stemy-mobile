import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logout from '~components/customs/Logout';
import ThemeToggle from '~components/customs/ThemeToggle';
import LoginScreen from '~screens/LoginScreen';
import RegisterScreen from '~screens/RegisterScreen';
import { AuthStackParamList } from '~types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <Logout />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <Logout />,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack.Navigator>
  );
}
