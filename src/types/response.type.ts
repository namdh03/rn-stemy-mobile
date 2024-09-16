export interface ErrorResponse<T> {
  error: T;
}

export interface SuccessResponse<T> {
  data: T;
}
