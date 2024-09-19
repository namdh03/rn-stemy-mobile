import { SuccessResponse } from './response.type';

export type LoginResponse = SuccessResponse<{
  login: {
    access_token: string;
  };
}>;

export type RegisterResponse = SuccessResponse<{
  register: {
    access_token: string;
  };
}>;
