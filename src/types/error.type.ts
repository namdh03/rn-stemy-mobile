import { ErrorResponse as ER } from './response.type';

export type Error = {
  message: string;
  path: string[];
};

export type ErrorResponse = ER<Error[]>;
