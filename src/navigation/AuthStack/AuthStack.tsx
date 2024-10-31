import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import ForgotPasswordConfirmScreen from '~screens/ForgotPasswordConfirmScreen';
import ForgotPasswordScreen from '~screens/ForgotPasswordScreen';
import LoginScreen from '~screens/LoginScreen';
import OTPScreen from '~screens/OTPScreen';
import RegisterScreen from '~screens/RegisterScreen';
import ResetPasswordScreen from '~screens/ResetPasswordScreen';
import { AuthStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade',
        headerTitle: '',
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: ({ canGoBack }) => (
          <Pressable onPress={() => canGoBack && navigation.goBack()}>
            <ChevronLeft className='text-primary' size={30} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
      <Stack.Screen name='ForgotPasswordConfirmScreen' component={ForgotPasswordConfirmScreen} />
      <Stack.Screen name='OTPScreen' component={OTPScreen} />
      <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
