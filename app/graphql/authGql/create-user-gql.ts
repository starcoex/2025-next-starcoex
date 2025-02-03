"use client";

import { gql } from "@apollo/client";

export const CREATE_USER_GQL = gql`
  mutation CreateUserGql($createUserInput: CreateUserInput!) {
    createUserGql(createUserInput: $createUserInput) {
      access_token
      ok
      error
      refresh_token
      activation_code
      activation_token
      user {
        name
        email
        phone_number
      }
    }
  }
`;
