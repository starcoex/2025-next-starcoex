import { gql } from "@apollo/client";

export const GET_USER = gql`
  query User {
    user {
      access_token
      email
      id
      name
      phone_number
      refresh_token
    }
  }
`;
