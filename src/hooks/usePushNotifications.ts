import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useShallow } from 'zustand/react/shallow';

import { useMutation } from '@tanstack/react-query';

import execute from '~graphql/execute';
import { SavePushTokenMutationVariables } from '~graphql/graphql';
import { GetPushTokenQuery, SavePushTokenMutation } from '~services/notification.services';
import { useStore } from '~store';
import { getDeviceId } from '~utils/device';
import { registerForPushNotificationsAsync } from '~utils/notification';

const createNotificationHandler = (shouldHandle: boolean) => {
  const handlerConfig = {
    shouldShowAlert: shouldHandle,
    shouldPlaySound: shouldHandle,
    shouldSetBadge: shouldHandle,
  };

  return {
    handleNotification: async () => handlerConfig,
  };
};

const setNotificationHandler = (shouldHandle: boolean) => {
  Notifications.setNotificationHandler(createNotificationHandler(shouldHandle));
};

const usePushNotifications = () => {
  const user = useStore(useShallow((state) => state.user));
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const { mutateAsync: getPushTokenMutateAsync } = useMutation({
    mutationFn: (deviceId: string) => execute(GetPushTokenQuery, { deviceId }),
  });

  const { mutateAsync: savePushTokenMutateAsync } = useMutation({
    mutationFn: (variables: SavePushTokenMutationVariables) => execute(SavePushTokenMutation, variables),
  });

  useEffect(() => {
    if (user) {
      setNotificationHandler(true);

      registerForPushNotificationsAsync()
        .then(async (token) => {
          if (!token) return;

          setExpoPushToken(token);
          const deviceId = await getDeviceId();
          if (!deviceId) return console.error('Failed to get device id');

          const existingToken = await getPushTokenMutateAsync(deviceId);
          if (!existingToken.data.getPushToken.id) {
            await savePushTokenMutateAsync({
              deviceId,
              platform: Platform.OS,
              token,
            });
          }
        })
        .catch((error) => setExpoPushToken(`${error}`));

      notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('response', response);
      });
    } else {
      // User is logged out, reset notification handler
      setNotificationHandler(false);
      setExpoPushToken(undefined);
      setNotification(undefined);

      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    }

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user, getPushTokenMutateAsync, savePushTokenMutateAsync]);

  return { expoPushToken, notification };
};

export default usePushNotifications;
