import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';

import constants from '~constants';
import { useAppIsReady, useColorScheme } from '~hooks';
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

export default function App() {
  const { isDarkColorScheme } = useColorScheme();
  const { appIsReady, onLayoutRootView } = useAppIsReady();

  if (!appIsReady) {
    return null;
  }

  return (
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
  );
}
