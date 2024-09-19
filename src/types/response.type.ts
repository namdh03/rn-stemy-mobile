export interface ErrorResponse<T> {
  errors: T;
}

export interface SuccessResponse<T> {
  data: T;
}
