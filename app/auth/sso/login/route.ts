import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getAppBaseUrl, getSsoLoginUrl, getSsoServiceUrl } from "@/lib/sso-cas";
import { SSO_STATE_COOKIE, isSecureCookie } from "@/lib/sso-session";

export const runtime = "nodejs";

export function GET() {
  try {
    const state = randomBytes(32).toString("base64url");
    const serviceUrl = getSsoServiceUrl(state);
    const response = NextResponse.redirect(getSsoLoginUrl(serviceUrl));

    response.cookies.set(SSO_STATE_COOKIE, state, {
      httpOnly: true,
      secure: isSecureCookie(),
      sameSite: "lax",
      path: "/",
      maxAge: 300,
    });

    return response;
  } catch (error) {
    console.error("Unable to start UI SSO login:", error);
    return NextResponse.redirect(
      new URL("/menfess?sso_error=config", getAppBaseUrl()),
    );
  }
}
