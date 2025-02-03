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
  const cookieStore = await cookies();

  if (cookie?.access_token) {
    cookieStore.set(cookie.access_token);
  }
  if (cookie?.refresh_token) {
    cookieStore.set(cookie.refresh_token);
  }
  redirect("/");
};

export default loginAction;
