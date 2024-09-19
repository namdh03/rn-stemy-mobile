import { graphql } from '~graphql';

export const Login = graphql(`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
