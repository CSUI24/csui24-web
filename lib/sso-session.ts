import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";
import type { SsoSessionUser } from "@/lib/sso-types";

export const SSO_SESSION_COOKIE = "csui24_sso_session";
export const SSO_STATE_COOKIE = "csui24_sso_state";
export const SSO_SESSION_MAX_AGE = 60 * 60 * 24;

interface SsoSessionPayload {
  user: SsoSessionUser;
  expiresAt: number;
}

function getEncryptionKey() {
  const secret = process.env.SSO_SESSION_SECRET?.trim();

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("SSO_SESSION_SECRET is not configured");
  }

  return createHash("sha256")
    .update(secret || "csui24-local-only-sso-session-secret")
    .digest();
}

function getCookieValue(cookieHeader: string | null, name: string) {
  const cookie = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return cookie?.slice(name.length + 1) || null;
}

export function createSsoSessionToken(user: SsoSessionUser) {
  const payload: SsoSessionPayload = {
    user,
    expiresAt: Math.floor(Date.now() / 1000) + SSO_SESSION_MAX_AGE,
  };
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);

  return [iv, cipher.getAuthTag(), encrypted]
    .map((part) => part.toString("base64url"))
    .join(".");
}

export function readSsoSessionToken(token: string | null | undefined) {
  if (!token) {
    return null;
  }

  try {
    const [encodedIv, encodedTag, encodedPayload, extra] = token.split(".");
    if (!encodedIv || !encodedTag || !encodedPayload || extra) {
      return null;
    }

    const decipher = createDecipheriv(
      "aes-256-gcm",
      getEncryptionKey(),
      Buffer.from(encodedIv, "base64url"),
    );
    decipher.setAuthTag(Buffer.from(encodedTag, "base64url"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encodedPayload, "base64url")),
      decipher.final(),
    ]).toString("utf8");
    const payload = JSON.parse(decrypted) as SsoSessionPayload;

    if (
      !payload.user ||
      typeof payload.user.username !== "string" ||
      !payload.user.username ||
      typeof payload.user.name !== "string" ||
      !payload.expiresAt ||
      payload.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload.user;
  } catch {
    return null;
  }
}

export function getSsoSessionUser(request: Request) {
  return readSsoSessionToken(
    getCookieValue(request.headers.get("cookie"), SSO_SESSION_COOKIE),
  );
}

export function isSecureCookie() {
  return process.env.NODE_ENV === "production";
}
