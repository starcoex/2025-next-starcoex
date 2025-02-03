import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, REFRESH_COOKIE } from "@/app/constants/cookie";
import { getAuthCookie } from "@/app/lib/auth-cookie";
import { API_AUTH_URL } from "@/app/constants/api";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/auth/login": true,
  "/auth/sms": true,
  "/auth/signup": true,
  "/auth//github/start": true,
  "/auth//github/complete": true,
  "/auth/google/start": true,
  "/auth/google/complete": true,
};

const unauthenticatedRoutes = [
  "/",
  "/auth/login",
  "/auth/loginAction",
  "/auth/signup",
];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const authenticated = !!cookieStore.get(AUTH_COOKIE)?.value;
  if (!authenticated && cookieStore.get(REFRESH_COOKIE)) {
    const refreshRes = await fetch(`${API_AUTH_URL}/auth/refresh`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      method: "POST",
    });
    const authCookies = getAuthCookie(refreshRes);
    if (authCookies?.access_token) {
      const response = NextResponse.redirect(request.url);
      response.cookies.set(authCookies.access_token);
      return response;
    }
  }
  if (
    !authenticated &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    return Response.redirect(new URL("/auth/loginAction", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
