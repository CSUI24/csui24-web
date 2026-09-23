import { NextResponse } from "next/server";
import { getAppBaseUrl } from "@/lib/sso-cas";
import {
  isSecureCookie,
  SSO_SESSION_COOKIE,
  SSO_STATE_COOKIE,
} from "@/lib/sso-session";

export function GET() {
  const response = NextResponse.redirect(new URL("/menfess", getAppBaseUrl()));

  for (const cookie of [SSO_SESSION_COOKIE, SSO_STATE_COOKIE]) {
    response.cookies.set(cookie, "", {
      httpOnly: true,
      secure: isSecureCookie(),
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}
