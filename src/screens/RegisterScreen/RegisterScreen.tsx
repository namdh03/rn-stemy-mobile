import { View } from 'react-native';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { RegisterScreenNavigationProps } from '~types/navigation';

const RegisterScreen = ({ navigation }: RegisterScreenNavigationProps) => {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Button onPress={() => navigation.replace('LoginScreen')}>
        <Text>Login</Text>
      </Button>
    </View>
  );
};

export default RegisterScreen;
