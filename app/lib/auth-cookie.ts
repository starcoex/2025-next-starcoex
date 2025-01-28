import { AUTH_COOKIE, REFRESH_COOKIE } from "@/app/constants/cookie";
import { jwtDecode } from "jwt-decode";

export const getAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (!setCookieHeader) {
    return;
  }
  const accessToken = setCookieHeader
    .split(";")
    .find((cookie) => cookie.includes(AUTH_COOKIE))
    ?.split("=")[1];
  const refreshToken = setCookieHeader
    .split(";")
    .find((cookie) => cookie.includes(REFRESH_COOKIE))
    ?.split("=")[1];

  return {
    accessToken: accessToken && {
      name: AUTH_COOKIE,
      value: accessToken ? accessToken : "",
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(accessToken).exp! * 1000),
    },
    refreshToken: refreshToken && {
      name: REFRESH_COOKIE,
      value: accessToken ? accessToken : "",
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(refreshToken).exp! * 1000),
    },
  };
};
