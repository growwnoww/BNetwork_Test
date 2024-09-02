import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);
interface AuthenticatedNextRequest extends NextRequest {
  auth?: any;
}

export default auth((req: AuthenticatedNextRequest): Response | void => {
  console.log("middleware called");
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  console.log("auht", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isCryptoRoute = nextUrl.pathname === "/api/auth/crypto"; // Add a specific check for the crypto route

  if (isApiAuthRoute) {
    console.log("hello isApiAuthRoute");
    if (isLoggedIn) {
      console.log("isLoggedIn", isLoggedIn);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    console.log("isAuthRoute", isAuthRoute);
    if (isLoggedIn) {
      console.log("isLoggedIn", isLoggedIn);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    console.log("User is not logged in");
    return Response.redirect(new URL("/web3auth", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
