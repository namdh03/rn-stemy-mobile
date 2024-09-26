import { graphql } from '~graphql';

export const LoginMutation = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`);

export const RegisterMutation = graphql(`
  mutation Register($email: String!, $fullName: String!, $password: String!, $phone: String!) {
    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {
      access_token
    }
  }
`);

export const SendResetPasswordOTPMutation = graphql(`
  mutation SendResetPasswordOTP($email: String!) {
    sendResetPasswordOTP(email: $email)
  }
`);

export const GetTokenResetPasswordMutation = graphql(`
  mutation GetTokenResetPassword($email: String!, $OTPCode: String!) {
    getTokenResetPassword(email: $email, OTPCode: $OTPCode)
  }
`);

export const ResetPasswordMutation = graphql(`
  mutation ResetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token)
  }
`);

export const LoginGoogleMutation = graphql(`
  mutation LoginWithGoogle($code: String!) {
    loginWithGoogle(code: $code) {
      access_token
    }
  }
`);

export const GetMeQuery = graphql(`
  query Me {
    me {
      createdAt
      email
      fullName
      id
      phone
      role
      status
      updatedAt
    }
  }
`);
