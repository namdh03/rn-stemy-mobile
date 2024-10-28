import axios, { AxiosInstance } from 'axios';

import configs from '~configs';
import constants from '~constants';

// import constants from '~constants';
// import { AuthResponse } from '~types/auth.type';
import { isErrorResponse, isLoginResponse, isLoginWithGoogleResponse, isRegisterResponse } from './responseChecker';
import {
  getAccessToken,
  // getRefreshToken,
  removeAccessToken,
  // removeRefreshToken,
  setAccessToken,
  // setRefreshToken,
} from './token-storage';

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: configs.env.EXPO_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (getAccessToken() && config.headers) {
          config.headers.Authorization = getAccessToken();
          return config;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    this.instance.interceptors.response.use(
      (response) => {
        if (isLoginResponse(response)) {
          const token = response.data.data.login.access_token;
          if (token) setAccessToken(token);
        }

        if (isRegisterResponse(response)) {
          const token = response.data.data.register.access_token;
          if (token) setAccessToken(token);
        }

        if (isLoginWithGoogleResponse(response)) {
          const token = response.data.data.loginWithGoogle.access_token;
          if (token) setAccessToken(token);
        }

        if (isErrorResponse(response)) {
          const isUnAuthenticated = response.data.errors.some((error) =>
            [constants.MESSAGES.TOKEN_NOT_FOUND, constants.MESSAGES.TOKEN_NOT_VALID].some(
              (message) => error.message === message,
            ),
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
