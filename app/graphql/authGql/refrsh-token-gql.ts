import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation RefreshGraphql($userId: Float!, $refreshToken: String!) {
    refreshGraphql(userId: $userId, refresh_token: $refreshToken) {
      access_token
      error
      ok
      refresh_token
    }
  }
`;
