import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import ForgotPasswordConfirmScreen from '~screens/ForgotPasswordConfirmScreen';
import ForgotPasswordScreen from '~screens/ForgotPasswordScreen';
import LoginScreen from '~screens/LoginScreen';
import OTPScreen from '~screens/OTPScreen';
import RegisterScreen from '~screens/RegisterScreen';
import ResetPasswordScreen from '~screens/ResetPasswordScreen';
import {
  AuthStackParamList,
  ForgotPasswordConfirmScreenNavigationProps,
  ForgotPasswordScreenNavigationProps,
  OTPScreenNavigationProps,
  ResetPasswordScreenNavigationProps,
} from '~types/navigation.type';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ animation: 'fade' }}>
      <AuthStack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
      <AuthStack.Screen
        name='ForgotPasswordScreen'
        component={ForgotPasswordScreen}
        options={({ navigation }: ForgotPasswordScreenNavigationProps) => ({
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-primary' size={30} />
            </Pressable>
          ),
        })}
      />
      <AuthStack.Screen
        name='ForgotPasswordConfirmScreen'
        component={ForgotPasswordConfirmScreen}
        options={({ navigation }: ForgotPasswordConfirmScreenNavigationProps) => ({
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-primary' size={30} />
            </Pressable>
          ),
        })}
      />
      <AuthStack.Screen
        name='OTPScreen'
        component={OTPScreen}
        options={({ navigation }: OTPScreenNavigationProps) => ({
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-primary' size={30} />
            </Pressable>
          ),
        })}
      />
      <AuthStack.Screen
        name='ResetPasswordScreen'
        component={ResetPasswordScreen}
        options={({ navigation }: ResetPasswordScreenNavigationProps) => ({
          headerTitle: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-primary' size={30} />
            </Pressable>
          ),
        })}
      />
    </AuthStack.Navigator>
  );
}
