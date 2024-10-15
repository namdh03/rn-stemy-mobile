import { Platform } from 'react-native';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

export const getDeviceId = async (): Promise<string | null> => {
  if (Device.isDevice) {
    if (Platform.OS === 'android') {
      return Application.getAndroidId();
    } else {
      return await Application.getIosIdForVendorAsync();
    }
  } else {
    return null;
  }
};
