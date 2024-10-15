import http from '~utils/http';

export const saveExpoPushToken = (data: unknown) => http.post('/expo-push-token', data);

export const getExpoPushToken = (deviceId: string) => http.get(`/expo-push-token/${deviceId}`);
