import constants from '~constants';

import { storage } from './mmkv-storage';

export const getAccessToken = () => {
  return storage.getString(constants.TOKEN.ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return storage.getString(constants.TOKEN.REFRESH_TOKEN_KEY);
};

export const removeAccessToken = () => {
  return storage.delete(constants.TOKEN.ACCESS_TOKEN_KEY);
};

export const removeRefreshToken = () => {
  return storage.delete(constants.TOKEN.REFRESH_TOKEN_KEY);
};

export const setAccessToken = (accessToken: string) => {
  return storage.set(constants.TOKEN.ACCESS_TOKEN_KEY, accessToken);
};

export const setRefreshToken = (refreshToken: string) => {
  return storage.set(constants.TOKEN.REFRESH_TOKEN_KEY, refreshToken);
};
