import { View } from 'react-native';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { ForgotPasswordScreenNavigationProps } from '~types/navigation';

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenNavigationProps) => {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Button onPress={() => navigation.replace('LoginScreen')}>
        <Text>Login</Text>
      </Button>
      <Text className='font-inter-black text-7xl text-primary tracking-[0.24px]'>Welcome Forgot Password!</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
