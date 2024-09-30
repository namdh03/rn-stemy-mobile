import { AppStateStatus, Platform } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useShallow } from 'zustand/react/shallow';

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { focusManager } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import configs from '~configs';
import constants from '~constants';
import { useAppIsReady, useAppState, useColorScheme, useOnlineManager } from '~hooks';
import AuthNavigator from '~navigation/AuthNavigator';
import MainNavigator from '~navigation/MainNavigator';
import { useStore } from '~store';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const RootNavigator = () => {
  const { isDarkColorScheme } = useColorScheme();
  const { isFetching, appIsReady, onLayoutRootView } = useAppIsReady();
  const isAuthenticated = useStore(useShallow((state) => state.isAuthenticated));
  useOnlineManager();
  useAppState(onAppStateChange);

  if (isFetching) {
    return <LoadingOverlay message='Loading...' loop />;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: isDarkColorScheme ? 'black' : 'white' }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}>
          <AlertNotificationRoot theme={isDarkColorScheme ? 'dark' : 'light'} colors={configs.alertNotifies.colors}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <SafeAreaView style={{ flex: 1 }}>
              <NavigationContainer
                linking={configs.linking}
                onReady={onLayoutRootView}
                theme={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}
              >
                {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
              </NavigationContainer>
            </SafeAreaView>
            <PortalHost />
          </AlertNotificationRoot>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
