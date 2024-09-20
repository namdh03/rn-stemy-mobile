import { AppStateStatus, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useShallow } from 'zustand/react/shallow';

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { focusManager } from '@tanstack/react-query';

import constants from '~constants';
import { useAppIsReady, useAppState, useColorScheme, useOnlineManager } from '~hooks';
import AuthStack from '~navigation/AuthStack';
import MainStack from '~navigation/MainStack';
import { useStore } from '~store';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const RootNavigation = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { appIsReady, onLayoutRootView } = useAppIsReady();
  const isAuthenticated = useStore(useShallow((state) => state.isAuthenticated));
  useOnlineManager();
  useAppState(onAppStateChange);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: isDarkColorScheme ? 'black' : 'white' }}>
      <ThemeProvider value={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer
            onReady={onLayoutRootView}
            theme={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}
          >
            {isAuthenticated ? <MainStack /> : <AuthStack />}
          </NavigationContainer>
        </SafeAreaView>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
