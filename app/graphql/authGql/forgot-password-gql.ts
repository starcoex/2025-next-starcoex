import { gql } from "@apollo/client";

export const FORGOT_PASSWORD_GQL = gql`
  mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
    forgotPassword(forgotPasswordInput: $forgotPasswordInput) {
      message
      ok
      error
    }
  }
`;
