"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_LOCAL_STATE = gql`
  query GetLocalState {
    isLoggedIn @client
  }
`;

const UserTest = () => {
  const { data } = useQuery(GET_LOCAL_STATE);
  console.log(data);
  return <div>User Test</div>;
};

export default UserTest;
