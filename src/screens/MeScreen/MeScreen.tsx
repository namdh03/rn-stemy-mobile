import { Text, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button } from '~components/ui/button';
import { useStore } from '~store';
import { removeAccessToken } from '~utils/token-storage';

const MeScreen = () => {
  const unAuthenticate = useStore(useShallow((state) => state.unAuthenticate));

  const logout = async () => {
    unAuthenticate();
    removeAccessToken();
    await GoogleSignin.signOut();
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Button size='lg' variant='destructive' onPress={logout}>
        <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>Logout</Text>
      </Button>
    </View>
  );
};

export default MeScreen;
