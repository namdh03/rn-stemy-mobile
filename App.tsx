// eslint-disable-next-line simple-import-sort/imports
import './gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import configs from '~configs';
import constants from '~constants';
import { useColorScheme, useOnlineManager } from '~hooks';
import Navigation from '~navigation/Navigation';

import './global.css';
import Modal from '~components/customs/Modal';

// Config react query
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

// Config react native google sign in
GoogleSignin.configure({
  webClientId: configs.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

enableScreens();

export default function App() {
  useKeepAwake();
  useOnlineManager();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView className='flex-1'>
      <ThemeProvider value={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}>
        <SafeAreaView className='flex-1'>
          <QueryClientProvider client={queryClient}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <Modal />
            <Navigation />
            <PortalHost />
          </QueryClientProvider>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
