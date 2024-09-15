import { AppStateStatus, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import constants from '~constants';
import { useAppIsReady, useAppState, useColorScheme, useOnlineManager } from '~hooks';
import AuthStack from '~navigation/AuthStack';

import './global.css';

// Config deep link
const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Login: 'login',
    },
  },
};

// Config theme
const LIGHT_THEME: Theme = {
  dark: false,
  colors: constants.NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: constants.NAV_THEME.dark,
};

// Config react query
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function App() {
  const { isDarkColorScheme } = useColorScheme();
  const { appIsReady, onLayoutRootView } = useAppIsReady();
  useOnlineManager();
  useAppState(onAppStateChange);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: isDarkColorScheme ? 'black' : 'white' }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          <NavigationContainer
            linking={linking}
            onReady={onLayoutRootView}
            theme={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}
          >
            <AuthStack />
          </NavigationContainer>
          <PortalHost />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
