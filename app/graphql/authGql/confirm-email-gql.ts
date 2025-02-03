import { gql } from "@apollo/client";

export const CONFIRM_EMAIL_GQL = gql`
  mutation VerifyEmailGql($verifyEmailInput: VerityEmailInput!) {
    verifyEmailGql(verifyEmailInput: $verifyEmailInput) {
      ok
      error
      user {
        name
        email
      }
    }
  }
`;
