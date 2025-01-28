import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      email
      id
      access_token
      phone_number
      refresh_token
      name
    }
  }
`;
