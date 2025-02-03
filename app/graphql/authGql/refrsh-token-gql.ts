import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation RefreshGraphql($refreshToken: String!) {
    refreshGraphql(refresh_token: $refreshToken) {
      access_token
      error
      ok
      refresh_token
    }
  }
`;
