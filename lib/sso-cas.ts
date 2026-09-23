import { XMLParser, XMLValidator } from "fast-xml-parser";
import type { SsoSessionUser } from "@/lib/sso-types";

const parser = new XMLParser({
  ignoreAttributes: false,
  removeNSPrefix: true,
  trimValues: true,
});

function readText(value: unknown): string | undefined {
  if (typeof value === "string" || typeof value === "number") {
    const text = String(value).trim();
    return text || undefined;
  }

  if (value && typeof value === "object" && "#text" in value) {
    return readText((value as { "#text": unknown })["#text"]);
  }

  return undefined;
}

export function getAppBaseUrl() {
  const developmentBaseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_BASE_URL?.trim()
      : undefined;
  const configuredBaseUrl =
    process.env.APP_BASE_URL?.trim() ||
    developmentBaseUrl ||
    "https://cosmic.csui.dev";
  const normalizedBaseUrl = /^https?:\/\//i.test(configuredBaseUrl)
    ? configuredBaseUrl
    : `https://${configuredBaseUrl}`;

  const parsed = new URL(normalizedBaseUrl);
  if (
    !["https:", "http:"].includes(parsed.protocol) ||
    (process.env.NODE_ENV === "production" && parsed.protocol !== "https:")
  ) {
    throw new Error("APP_BASE_URL must use HTTPS in production");
  }

  return parsed.origin;
}

export function getSsoServiceUrl(state: string) {
  const callbackBaseUrl =
    process.env.SSO_CALLBACK_URL?.trim() ||
    `${getAppBaseUrl()}/auth/sso/callback`;
  const callbackUrl = new URL(callbackBaseUrl);
  if (
    callbackUrl.origin !== getAppBaseUrl() ||
    (process.env.NODE_ENV === "production" && callbackUrl.protocol !== "https:")
  ) {
    throw new Error("SSO_CALLBACK_URL must use the application HTTPS origin");
  }

  callbackUrl.search = "";
  callbackUrl.hash = "";
  callbackUrl.searchParams.set("state", state);

  return callbackUrl.toString();
}

function getSsoBaseUrl() {
  const baseUrl = new URL(
    process.env.SSO_BASE_URL?.trim() || "https://sso.ui.ac.id/cas2",
  );
  if (
    !["https:", "http:"].includes(baseUrl.protocol) ||
    (process.env.NODE_ENV === "production" && baseUrl.protocol !== "https:")
  ) {
    throw new Error("SSO_BASE_URL must use HTTPS in production");
  }

  return `${baseUrl.origin}${baseUrl.pathname.replace(/\/+$/, "")}`;
}

export function getSsoLoginUrl(serviceUrl: string) {
  const loginUrl = new URL(`${getSsoBaseUrl()}/login`);
  loginUrl.searchParams.set("service", serviceUrl);
  return loginUrl.toString();
}

export async function validateSsoTicket(ticket: string, serviceUrl: string) {
  const validationUrl = new URL(`${getSsoBaseUrl()}/serviceValidate`);
  validationUrl.searchParams.set("service", serviceUrl);
  validationUrl.searchParams.set("ticket", ticket);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(validationUrl, {
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`SSO validation returned ${response.status}`);
    }

    const xml = await response.text();
    if (XMLValidator.validate(xml) !== true) {
      throw new Error("SSO validation response was not valid XML");
    }

    const parsed = parser.parse(xml) as {
      serviceResponse?: {
        authenticationSuccess?: Record<string, unknown>;
      };
    };
    const authentication = parsed.serviceResponse?.authenticationSuccess;
    const username = readText(authentication?.user);

    if (!authentication || !username) {
      throw new Error("SSO ticket was not accepted");
    }

    const user: SsoSessionUser = {
      username,
      name:
        readText(authentication.nama) ??
        readText(authentication.name) ??
        username,
      npm: readText(authentication.npm),
      organizationalCode:
        readText(authentication.kd_org) ??
        readText(authentication.organizationalCode),
    };

    return user;
  } finally {
    clearTimeout(timeout);
  }
}
