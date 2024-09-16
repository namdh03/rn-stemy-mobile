import axios, { AxiosError, AxiosInstance } from 'axios';

import configs from '~configs';
import constants from '~constants';
import { AuthResponse } from '~types/auth.type';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './token-storage';

class Http {
  private accessToken?: string;
  private refreshToken?: string;
  instance: AxiosInstance;

  constructor() {
    this.accessToken = getAccessToken();
    this.refreshToken = getRefreshToken();
    this.instance = axios.create({
      baseURL: configs.env.EXPO_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url, method } = response.config;
        if (method === 'post' && url?.includes(constants.AUTH_ROUTES.login || constants.AUTH_ROUTES.register)) {
          this.accessToken = (response.data as AuthResponse).data.access_token;
          this.refreshToken = (response.data as AuthResponse).data.refresh_token;
          setAccessToken(this.accessToken);
          setRefreshToken(this.refreshToken);
        } else if (url === constants.AUTH_ROUTES.logout) {
          this.accessToken = '';
          this.refreshToken = '';
          removeAccessToken();
          removeRefreshToken();
        }
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === constants.HTTP_STATUS.UNAUTHORIZED) {
          removeAccessToken();
          removeRefreshToken();
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
