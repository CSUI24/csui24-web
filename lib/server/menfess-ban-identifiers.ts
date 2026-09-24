import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";

const LOCAL_BAN_HASH_SECRET = "csui24-local-only-menfess-ban-secret";

function getHashKey() {
  const secret = process.env.SSO_SESSION_SECRET?.trim();

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("SSO_SESSION_SECRET is not configured");
  }

  return createHash("sha256")
    .update("csui24:menfess-ban-hash:v1\0")
    .update(secret || LOCAL_BAN_HASH_SECRET)
    .digest();
}

function hashIdentifier(namespace: "sso" | "guest-ip", value: string) {
  return createHmac("sha256", getHashKey())
    .update(`${namespace}:${value}`)
    .digest("hex");
}

export function hashSsoIdentity(username: string) {
  const normalizedUsername = username.normalize("NFKC").trim().toLowerCase();
  return hashIdentifier("sso", normalizedUsername);
}

function normalizeIpAddress(value: string | null) {
  const candidate = value?.split(",", 1)[0]?.trim().replace(/^\[|\]$/g, "");

  if (!candidate) {
    return null;
  }

  const ipv4MappedAddress = candidate.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
  if (ipv4MappedAddress && isIP(ipv4MappedAddress[1]) === 4) {
    return ipv4MappedAddress[1];
  }

  const family = isIP(candidate);
  if (family === 4) {
    return candidate;
  }

  if (family === 6) {
    try {
      return new URL(`http://[${candidate}]/`).hostname.slice(1, -1).toLowerCase();
    } catch {
      return candidate.toLowerCase();
    }
  }

  return null;
}

export function hashGuestRequestIp(request: Request) {
  const hasCloudflareRay = Boolean(request.headers.get("cf-ray"));
  let ipAddress: string | null = null;

  if (hasCloudflareRay) {
    const expectedMarker = process.env.CLOUDFLARE_PROXY_SECRET?.trim();
    const actualMarker = request.headers.get("x-cosmic-proxy-secret");

    if (!expectedMarker || !actualMarker) {
      return null;
    }

    const expectedBytes = Buffer.from(expectedMarker);
    const actualBytes = Buffer.from(actualMarker);
    if (
      expectedBytes.length !== actualBytes.length ||
      !timingSafeEqual(expectedBytes, actualBytes)
    ) {
      return null;
    }

    ipAddress = normalizeIpAddress(
      request.headers.get("cf-connecting-ip"),
    );
  } else {
    ipAddress = [
      request.headers.get("x-vercel-forwarded-for"),
      request.headers.get("x-forwarded-for"),
      request.headers.get("x-real-ip"),
    ]
      .map(normalizeIpAddress)
      .find((value) => value !== null) ?? null;
  }

  return ipAddress ? hashIdentifier("guest-ip", ipAddress) : null;
}
