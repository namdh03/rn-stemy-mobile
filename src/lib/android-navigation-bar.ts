import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import constants from '~constants';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
  if (Platform.OS !== 'android') return;
  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? constants.NAV_THEME.dark.background : constants.NAV_THEME.light.background,
  );
}
