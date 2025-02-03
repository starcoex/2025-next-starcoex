import { AUTH_COOKIE, REFRESH_COOKIE } from "@/app/constants/cookie";
import { jwtDecode } from "jwt-decode";

export const getAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (!setCookieHeader) {
    return;
  }
  const access_token = setCookieHeader
    .split(";")
    .find((cookie) => cookie.includes(AUTH_COOKIE))
    ?.split("=")[1];
  const refresh_token = setCookieHeader
    .split(";")
    .find((cookie) => cookie.includes(REFRESH_COOKIE))
    ?.split("=")[1];

  return {
    access_token: access_token && {
      name: AUTH_COOKIE,
      value: access_token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(access_token).exp! * 1000),
    },
    refresh_token: refresh_token && {
      name: REFRESH_COOKIE,
      value: refresh_token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(refresh_token).exp! * 1000),
    },
  };
};
