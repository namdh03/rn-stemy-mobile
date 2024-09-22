import { graphql } from '~graphql';

export const Login = graphql(`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`);

export const Register = graphql(`
  mutation RegisterMutation($email: String!, $fullName: String!, $password: String!, $phone: String!) {
    register(email: $email, fullName: $fullName, password: $password, phone: $phone) {
      access_token
    }
  }
`);

export const SendResetPasswordOTP = graphql(`
  mutation SendResetPasswordOTPMutation($email: String!) {
    sendResetPasswordOTP(email: $email)
  }
`);

export const GetTokenResetPassword = graphql(`
  mutation GetTokenResetPasswordMutation($email: String!, $OTPCode: String!) {
    getTokenResetPassword(email: $email, OTPCode: $OTPCode)
  }
`);

export const ResetPassword = graphql(`
  mutation ResetPasswordMutation($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token)
  }
`);

export const LoginGoogle = graphql(`
  mutation LoginWithGoogleMutation($code: String!) {
    loginWithGoogle(code: $code) {
      access_token
    }
  }
`);

export const GetMe = graphql(`
  query MeQuery {
    me {
      email
      fullName
      id
      phone
      role
      status
    }
  }
`);
