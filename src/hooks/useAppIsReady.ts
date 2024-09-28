/* eslint-disable @typescript-eslint/no-require-imports */
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { GetMeQuery } from '~services/user.serivces';
import { useStore } from '~store';
import { storage } from '~utils/mmkv-storage';

import useColorScheme from './useColorScheme';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function useAppIsReady() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const [accessToken] = useMMKVString(constants.TOKEN.ACCESS_TOKEN_KEY);
  const { data, refetch, isFetching } = useQuery({
    queryKey: [constants.USER_QUERY_KEY.GET_ME_QUERY_KEY],
    queryFn: () => execute(GetMeQuery),
    enabled: !!accessToken,
    select: (data) => data.data,
  });
  const authenticate = useStore(useShallow((state) => state.authenticate));

  useEffect(() => {
    (async () => {
      // Handle theme mode
      const theme = storage.getString('theme');

      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        storage.set('theme', colorScheme);
      } else {
        const colorTheme = theme === 'dark' ? 'dark' : 'light';

        if (colorTheme !== colorScheme) {
          setColorScheme(colorTheme);
        }
      }

      // Load fonts
      await Font.loadAsync({
        'Jaro-Regular': require('~assets/fonts/Jaro/Jaro-Regular.ttf'),
        'Inter_18pt-Black': require('~assets/fonts/Inter/Inter_18pt-Black.ttf'),
        'Inter_18pt-Bold': require('~assets/fonts/Inter/Inter_18pt-Bold.ttf'),
        'Inter_18pt-ExtraBold': require('~assets/fonts/Inter/Inter_18pt-ExtraBold.ttf'),
        'Inter_18pt-ExtraLight': require('~assets/fonts/Inter/Inter_18pt-ExtraLight.ttf'),
        'Inter_18pt-Light': require('~assets/fonts/Inter/Inter_18pt-Light.ttf'),
        'Inter_18pt-Medium': require('~assets/fonts/Inter/Inter_18pt-Medium.ttf'),
        'Inter_18pt-Regular': require('~assets/fonts/Inter/Inter_18pt-Regular.ttf'),
        'Inter_18pt-SemiBold': require('~assets/fonts/Inter/Inter_18pt-SemiBold.ttf'),
        'Inter_18pt-Thin': require('~assets/fonts/Inter/Inter_18pt-Thin.ttf'),
      });

      // Load user
      if (accessToken) {
        const { data } = await refetch();
        if (data) authenticate(data.me);
      }
    })().finally(() => {
      setAppIsReady(true);
    });
  }, []);

  // Listen accessToken change
  useEffect(() => {
    if (accessToken && data) {
      authenticate(data.me);
    }
  }, [accessToken, data]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return {
    isFetching,
    appIsReady,
    onLayoutRootView,
  };
}
