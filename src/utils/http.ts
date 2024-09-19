import axios, { AxiosInstance } from 'axios';

import configs from '~configs';
import constants from '~constants';

// import constants from '~constants';
// import { AuthResponse } from '~types/auth.type';
import { isErrorResponse, isLoginResponse, isRegisterResponse } from './responseChecker';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  // removeRefreshToken,
  setAccessToken,
  // setRefreshToken,
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
      (error) => Promise.reject(error),
    );
    this.instance.interceptors.response.use(
      (response) => {
        if (isLoginResponse(response)) {
          this.accessToken = response.data.data.login.access_token;
          if (this.accessToken) setAccessToken(this.accessToken);
        }

        if (isRegisterResponse(response)) {
          this.accessToken = response.data.data.register.access_token;
          if (this.accessToken) setAccessToken(this.accessToken);
        }

        if (isErrorResponse(response)) {
          const isUnAuthenticated = response.data.errors.some((error) =>
            error.message.includes(constants.MESSAGES.TOKEN_NOT_FOUND),
          );

          if (isUnAuthenticated) removeAccessToken();

          throw response.data.errors;
        }

        return response;
      },
      (error) => Promise.reject(error),
    );
  }
}

const http = new Http().instance;

export default http;
