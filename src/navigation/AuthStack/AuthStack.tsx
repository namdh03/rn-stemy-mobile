import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordScreen from '~screens/ForgotPasswordScreen';
import LoginScreen from '~screens/LoginScreen';
import RegisterScreen from '~screens/RegisterScreen';
import { AuthStackParamList } from '~types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
