import { NextResponse } from "next/server";
import {
  getAppBaseUrl,
  getSsoServiceUrl,
  validateSsoTicket,
} from "@/lib/sso-cas";
import {
  createSsoSessionToken,
  SSO_SESSION_COOKIE,
  SSO_SESSION_MAX_AGE,
  SSO_STATE_COOKIE,
  isSecureCookie,
} from "@/lib/sso-session";

export const runtime = "nodejs";

function readCookie(request: Request, name: string) {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie?.slice(name.length + 1) || null;
}

function redirectWithError(error: string) {
  const response = NextResponse.redirect(
    new URL(`/menfess?sso_error=${error}`, getAppBaseUrl()),
  );
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.cookies.set(SSO_STATE_COOKIE, "", {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function GET(request: Request) {
  const callbackUrl = new URL(request.url);
  const state = callbackUrl.searchParams.get("state");
  const savedState = readCookie(request, SSO_STATE_COOKIE);
  const ticket = callbackUrl.searchParams.get("ticket");

  if (!state || !savedState || state !== savedState || !ticket) {
    return redirectWithError("login");
  }

  try {
    const serviceUrl = getSsoServiceUrl(state);
    const user = await validateSsoTicket(ticket, serviceUrl);
    const sessionToken = createSsoSessionToken(user);
    const response = NextResponse.redirect(
      new URL("/menfess?sso=connected", getAppBaseUrl()),
    );
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");

    response.cookies.set(SSO_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: isSecureCookie(),
      sameSite: "lax",
      path: "/",
      maxAge: SSO_SESSION_MAX_AGE,
    });
    response.cookies.set(SSO_STATE_COOKIE, "", {
      httpOnly: true,
      secure: isSecureCookie(),
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch {
    console.error("UI SSO callback failed while validating the login response");
    return redirectWithError("login");
  }
}
