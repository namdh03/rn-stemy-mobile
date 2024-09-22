/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n':
    types.LoginMutationDocument,
  '\n  mutation RegisterMutation($email: String!, $fullName: String!, $password: String!, $phone: String!) {\n    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {\n      access_token\n    }\n  }\n':
    types.RegisterMutationDocument,
  '\n  mutation SendResetPasswordOTPMutation($email: String!) {\n    sendResetPasswordOTP(email: $email)\n  }\n':
    types.SendResetPasswordOtpMutationDocument,
  '\n  mutation GetTokenResetPasswordMutation($email: String!, $OTPCode: String!) {\n    getTokenResetPassword(email: $email, OTPCode: $OTPCode)\n  }\n':
    types.GetTokenResetPasswordMutationDocument,
  '\n  mutation ResetPasswordMutation($password: String!, $token: String!) {\n    resetPassword(password: $password, token: $token)\n  }\n':
    types.ResetPasswordMutationDocument,
  '\n  query MeQuery {\n    me {\n      email\n      fullName\n      id\n      phone\n      role\n      status\n    }\n  }\n':
    types.MeQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n',
): typeof import('./graphql').LoginMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation RegisterMutation($email: String!, $fullName: String!, $password: String!, $phone: String!) {\n    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {\n      access_token\n    }\n  }\n',
): typeof import('./graphql').RegisterMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SendResetPasswordOTPMutation($email: String!) {\n    sendResetPasswordOTP(email: $email)\n  }\n',
): typeof import('./graphql').SendResetPasswordOtpMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation GetTokenResetPasswordMutation($email: String!, $OTPCode: String!) {\n    getTokenResetPassword(email: $email, OTPCode: $OTPCode)\n  }\n',
): typeof import('./graphql').GetTokenResetPasswordMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResetPasswordMutation($password: String!, $token: String!) {\n    resetPassword(password: $password, token: $token)\n  }\n',
): typeof import('./graphql').ResetPasswordMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query MeQuery {\n    me {\n      email\n      fullName\n      id\n      phone\n      role\n      status\n    }\n  }\n',
): typeof import('./graphql').MeQueryDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
