import { useEffect } from 'react';
import { Platform } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

export default function useOnlineManager() {
  useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable));
      });
    }
  }, []);
}
