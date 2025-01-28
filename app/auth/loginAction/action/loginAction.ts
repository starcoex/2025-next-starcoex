"use server";
import { API_AUTH_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";
import { getAuthCookie } from "@/app/lib/auth-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginAction = async (_preState: any, formData: FormData) => {
  const response = await fetch(`${API_AUTH_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  console.log(response);
  // const json = await response.json();
  if (!response.ok) {
    const json = await response.json();
    if (response.status === 401) {
      return { error: getErrorMessage(json), statusCode: json.statusCode };
    } else if (response.status === 404) {
      return { error: getErrorMessage(json), statusCode: json.statusCode };
    } else {
      return { error: getErrorMessage(json) };
    }
  }

  const cookie = getAuthCookie(response);
  if (cookie?.accessToken) {
    (await cookies()).set(cookie.accessToken);
  }
  if (cookie?.refreshToken) {
    (await cookies()).set(cookie.refreshToken);
  }
  redirect("/");
};

export default loginAction;
