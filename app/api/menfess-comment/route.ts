import {
  failure,
  internalServerError,
  methodNotAllowed,
  parseJson,
  success,
} from "@/lib/api";
import { commentCreateSchema } from "@/lib/api/schemas";
import { isApiError } from "@/lib/api/errors";
import { globalRateLimit } from "@/lib/rateLimiter";
import { createComment, listComments } from "@/lib/server/menfess-comments";
import { getSsoSessionUser } from "@/lib/sso-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = globalRateLimit();

export async function GET(request: Request) {
  if (!getSsoSessionUser(request)) {
    return failure("Login with UI SSO to view menfess", 401);
  }

  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id) {
    return failure("Missing menfess ID", 400);
  }

  try {
    const data = await listComments(id);
    return success("Menfess Comment fetched successfully", data);
  } catch (error) {
    return internalServerError(error, "Error fetching menfess comments:");
  }
}

export async function POST(request: Request) {
  if (!getSsoSessionUser(request)) {
    return failure("Login with UI SSO to comment", 401);
  }

  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const input = await parseJson(request, commentCreateSchema);
  if (!input) {
    return failure("Missing menfess ID or content", 400);
  }

  try {
    const data = await createComment(input);
    return success("Menfess Comment created successfully", data);
  } catch (error) {
    if (isApiError(error)) {
      return failure(error.message, error.status);
    }

    return internalServerError(error, "Error creating menfess comment:");
  }
}

export function PUT() {
  return methodNotAllowed(["GET", "POST"]);
}
