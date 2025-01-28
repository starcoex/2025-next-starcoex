"use client";

import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      access_token
      email
      id
      name
      phone_number
      refresh_token
    }
  }
`;
