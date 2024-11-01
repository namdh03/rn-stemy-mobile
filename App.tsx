// eslint-disable-next-line simple-import-sort/imports
import './gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { useKeepAwake } from 'expo-keep-awake';
import { StatusBar } from 'expo-status-bar';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import configs from '~configs';
import constants from '~constants';
import { useColorScheme, useOnlineManager } from '~hooks';
import Navigation from '~navigation/Navigation';

import './global.css';
import Modal from '~components/customs/Modal';

enableScreens();

// Config react query
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

// Config react native google sign in
GoogleSignin.configure({
  webClientId: configs.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: true,
});

export default function App() {
  useKeepAwake();
  useOnlineManager();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}>
        <SafeAreaView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        </SafeAreaView>
        <Modal />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
