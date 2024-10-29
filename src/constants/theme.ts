import { Theme } from '@react-navigation/native';

import NAV_THEME from './nav-theme';

// Config theme
export const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: 'Inter_18pt-Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Inter_18pt-Medium',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Inter_18pt-Bold',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'Inter_18pt-Black',
      fontWeight: '900',
    },
  },
};
export const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: 'Inter_18pt-Regular',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Inter_18pt-Medium',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Inter_18pt-Bold',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'Inter_18pt-Black',
      fontWeight: '900',
    },
  },
};
