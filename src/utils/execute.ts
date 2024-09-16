import { TypedDocumentString } from '~graphql/graphql';
import { SuccessResponse } from '~types/response.type';
import http from '~utils/http';

export const execute = <TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> =>
  http
    .post<SuccessResponse<TResult>>('/api', {
      query: query,
      variables,
    })
    .then((response) => response.data.data);
