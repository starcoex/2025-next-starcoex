"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { UsersQuery } from "@/generated/graphql";
import { GET_USERS } from "@/app/graphql/authGql/get-users";

const GetUsers = () => {
  const { loading, error, data } = useQuery<UsersQuery>(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <ul>
      {data?.users.map((user) => (
        <li key={user.id}>
          {user.name}
          {user.email}
        </li>
      ))}
    </ul>
  );
};

export default GetUsers;
