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
  '\n  mutation AddToCart($productId: Float!, $quantity: Float!) {\n    addToCart(productId: $productId, quantity: $quantity) {\n      id\n    }\n  }\n':
    types.AddToCartDocument,
  '\n  query GetProduct($id: Float!) {\n    product(id: $id) {\n      categories {\n        name\n      }\n      images {\n        id\n        url\n      }\n      description\n      id\n      name\n      price\n      rating\n      sold\n      feedbacks {\n        comment\n        createdAt\n        id\n        rating\n        user {\n          fullName\n        }\n      }\n    }\n    products(currentItem: 10, order: ASC, sort: "price") {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n':
    types.GetProductDocument,
  '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n':
    types.LoginDocument,
  '\n  mutation Register($email: String!, $fullName: String!, $password: String!, $phone: String!) {\n    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {\n      access_token\n    }\n  }\n':
    types.RegisterDocument,
  '\n  mutation SendResetPasswordOTP($email: String!) {\n    sendResetPasswordOTP(email: $email)\n  }\n':
    types.SendResetPasswordOtpDocument,
  '\n  mutation GetTokenResetPassword($email: String!, $OTPCode: String!) {\n    getTokenResetPassword(email: $email, OTPCode: $OTPCode)\n  }\n':
    types.GetTokenResetPasswordDocument,
  '\n  mutation ResetPassword($password: String!, $token: String!) {\n    resetPassword(password: $password, token: $token)\n  }\n':
    types.ResetPasswordDocument,
  '\n  mutation LoginWithGoogle($code: String!) {\n    loginWithGoogle(code: $code) {\n      access_token\n    }\n  }\n':
    types.LoginWithGoogleDocument,
  '\n  query Me {\n    me {\n      createdAt\n      email\n      fullName\n      id\n      phone\n      role\n      status\n      updatedAt\n    }\n  }\n':
    types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddToCart($productId: Float!, $quantity: Float!) {\n    addToCart(productId: $productId, quantity: $quantity) {\n      id\n    }\n  }\n',
): typeof import('./graphql').AddToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetProduct($id: Float!) {\n    product(id: $id) {\n      categories {\n        name\n      }\n      images {\n        id\n        url\n      }\n      description\n      id\n      name\n      price\n      rating\n      sold\n      feedbacks {\n        comment\n        createdAt\n        id\n        rating\n        user {\n          fullName\n        }\n      }\n    }\n    products(currentItem: 10, order: ASC, sort: "price") {\n      items {\n        id\n        images {\n          url\n        }\n        price\n        name\n        rating\n        feedbacks {\n          id\n        }\n      }\n    }\n  }\n',
): typeof import('./graphql').GetProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      access_token\n    }\n  }\n',
): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Register($email: String!, $fullName: String!, $password: String!, $phone: String!) {\n    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {\n      access_token\n    }\n  }\n',
): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation SendResetPasswordOTP($email: String!) {\n    sendResetPasswordOTP(email: $email)\n  }\n',
): typeof import('./graphql').SendResetPasswordOtpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation GetTokenResetPassword($email: String!, $OTPCode: String!) {\n    getTokenResetPassword(email: $email, OTPCode: $OTPCode)\n  }\n',
): typeof import('./graphql').GetTokenResetPasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation ResetPassword($password: String!, $token: String!) {\n    resetPassword(password: $password, token: $token)\n  }\n',
): typeof import('./graphql').ResetPasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LoginWithGoogle($code: String!) {\n    loginWithGoogle(code: $code) {\n      access_token\n    }\n  }\n',
): typeof import('./graphql').LoginWithGoogleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Me {\n    me {\n      createdAt\n      email\n      fullName\n      id\n      phone\n      role\n      status\n      updatedAt\n    }\n  }\n',
): typeof import('./graphql').MeDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
