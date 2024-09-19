import { Theme } from '@react-navigation/native';

import NAV_THEME from './nav-theme';

// Config theme
export const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
export const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};
