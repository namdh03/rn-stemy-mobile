import { AxiosResponse } from 'axios';

import { LoginResponse, RegisterResponse } from '~types/auth.type';
import { Error, ErrorResponse } from '~types/error.type';

export function isLoginResponse(response: AxiosResponse<unknown>): response is AxiosResponse<LoginResponse> {
  return typeof (response.data as LoginResponse)?.data?.login?.access_token === 'string';
}

export function isRegisterResponse(response: AxiosResponse<unknown>): response is AxiosResponse<RegisterResponse> {
  return typeof (response.data as RegisterResponse)?.data?.register?.access_token === 'string';
}

export function isErrorResponse(response: AxiosResponse<unknown>): response is AxiosResponse<ErrorResponse> {
  return (
    typeof response.data === 'object' &&
    response.data !== null &&
    Array.isArray((response.data as ErrorResponse).errors)
  );
}

export default function isErrors(error: unknown): error is Error[] {
  return Array.isArray(error);
}
