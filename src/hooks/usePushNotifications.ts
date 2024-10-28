import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { useShallow } from 'zustand/react/shallow';

import { useMutation } from '@tanstack/react-query';

import execute from '~graphql/execute';
import { SavePushTokenMutationVariables } from '~graphql/graphql';
import { DeactivatePushTokenMutation, SavePushTokenMutation } from '~services/notification.services';
import { useStore } from '~store';
import { getDeviceId } from '~utils/device';
import { registerForPushNotificationsAsync } from '~utils/notification';

const useReceiveNotifications = () => {
  const user = useStore(useShallow((state) => state.user));
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { mutateAsync: deactivatePushTokenMutateAsync } = useMutation({
    mutationFn: (deviceId: string) => execute(DeactivatePushTokenMutation, { deviceId }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync: savePushTokenMutateAsync } = useMutation({
    mutationFn: (variables: SavePushTokenMutationVariables) => execute(SavePushTokenMutation, variables),
  });

  useEffect(() => {
    if (!user) return;
    registerForPushNotificationsAsync()
      .then(async (token) => {
        const deviceId = await getDeviceId();
        if (!deviceId) return console.error('Failed to get device id');

        const existingToken = await deactivatePushTokenMutateAsync(deviceId);
        console.log(existingToken);
        if (!existingToken) {
          setExpoPushToken(token);
        }
      })
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('response', response);
    });

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user]);

  return { expoPushToken, notification };
};

export default useReceiveNotifications;
