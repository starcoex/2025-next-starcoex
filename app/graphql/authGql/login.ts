import { gql } from "@apollo/client";

export const LOGIN_GQL = gql`
  mutation LoginGraphql($loginInput: LoginInput!) {
    loginGraphql(loginInput: $loginInput) {
      access_token
      error
      refresh_token
      ok
      user {
        name
        email
        access_token
        refresh_token
        phone_number
        id
      }
    }
  }
`;
