import { AlertNotificationRoot } from 'react-native-alert-notification';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useShallow } from 'zustand/react/shallow';

import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import configs from '~configs';
import constants from '~constants';
import { Role } from '~graphql/graphql';
import { useAppIsReady, useColorScheme, usePushNotifications } from '~hooks';
import AuthNavigator from '~navigation/AuthNavigator';
import MainNavigator from '~navigation/MainNavigator';
import StaffNavigator from '~navigation/StaffNavigator';
import { useStore } from '~store';

const RootNavigator = () => {
  usePushNotifications();
  const { isDarkColorScheme } = useColorScheme();
  const { isLoading, appIsReady, onLayoutRootView } = useAppIsReady();
  const { isAuthenticated, user } = useStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    })),
  );

  const renderNavigator = () => {
    if (!isAuthenticated || !user) {
      return <AuthNavigator />;
    }

    switch (user.role) {
      case Role.Customer:
        return <MainNavigator />;
      case Role.Staff:
        return <StaffNavigator />;
    }
  };

  if (isLoading) {
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
                {renderNavigator()}
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
