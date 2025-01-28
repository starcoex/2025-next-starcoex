import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, REFRESH_COOKIE } from "@/app/constants/cookie";
import { getAuthCookie } from "@/app/lib/auth-cookie";

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
  const authenticated = !!(await cookies()).get(AUTH_COOKIE)?.value;
  const existsUrl = publicOnlyUrls[request.nextUrl.pathname];
  if (!authenticated && (await cookies()).get(REFRESH_COOKIE)) {
    const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
      headers: {
        Cookie: cookies().toString(),
      },
      method: "POST",
    });
    const authCookies = getAuthCookie(refreshRes);
    if (authCookies?.accessToken) {
      const response = NextResponse.redirect(request.url);
      response.cookies.set(authCookies.accessToken);
      return response;
    }
  }

  if (
    !authenticated &&
    !unauthenticatedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    )
  ) {
    return Response.redirect(new URL("/", request.url));
  }

  // if (!authenticated) {
  //   if (!existsUrl) {
  //     return Response.redirect(new URL("/", request.url));
  //   } else if (existsUrl) {
  //     return Response.redirect(new URL("/blog", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
