import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { removeAccessToken } from '~utils/token-storage';

const HomeScreen = () => {
  const unAuthenticate = useStore(useShallow((state) => state.unAuthenticate));

  const logout = async () => {
    unAuthenticate();
    removeAccessToken();
    await GoogleSignin.signOut();
  };

  return (
    <View>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
