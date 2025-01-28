import { gql } from "@apollo/client";

export const ME_GQL = gql`
  query MeGql {
    meGql {
      ok
      error
      user {
        name
        id
        email
        phone_number
        refresh_token
      }
    }
  }
`;
