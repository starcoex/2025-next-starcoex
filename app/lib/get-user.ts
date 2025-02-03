"use server";

import { get } from "@/app/util/fetch";

const getUser = async () => {
  return get("/users/me");
};
export default getUser;
