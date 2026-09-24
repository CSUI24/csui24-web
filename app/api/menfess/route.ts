import {
  failure,
  internalServerError,
  methodNotAllowed,
  parseJson,
  success,
} from "@/lib/api";
import { requireAdmin } from "@/lib/api/auth";
import { menfessIdSchema, menfessInputSchema } from "@/lib/api/schemas";
import { isApiError } from "@/lib/api/errors";
import { globalRateLimit } from "@/lib/rateLimiter";
import { getSsoSessionUser } from "@/lib/sso-session";
import {
  BANNED_MESSAGE,
  createMenfess,
  deleteMenfess,
  formatCooldown,
  listPublicMenfess,
  MenfessCooldownError,
} from "@/lib/server/menfess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = globalRateLimit(1);

export async function GET(request: Request) {
  if (!getSsoSessionUser(request)) {
    return failure("Login with UI SSO to view menfess", 401);
  }

  try {
    const data = await listPublicMenfess();
    return success("Menfess fetched successfully", data);
  } catch (error) {
    return internalServerError(error, "Error fetching menfess:");
  }
}

export async function POST(request: Request) {
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const payload = await parseJson(request, menfessInputSchema);
  if (!payload?.to || !payload.from || !payload.message || !payload.mode) {
    return failure("All fields are required", 400);
  }

  if (!payload.fingerprint) {
    return failure("Fingerprint is required", 400);
  }

  try {
    const result = await createMenfess(request, {
      to: payload.to,
      from: payload.from,
      message: payload.message,
      fingerprint: payload.fingerprint,
      mode: payload.mode,
      imageKeys: payload.imageKeys,
    });

    if (result.blocked) {
      return failure(BANNED_MESSAGE, 403);
    }

    return success(
      result.pendingReview
        ? "Menfess submitted for admin review"
        : "Menfess sent successfully",
      null,
    );
  } catch (error) {
    if (error instanceof MenfessCooldownError) {
      return failure(
        `Tunggu ${formatCooldown(error.remainingMs)} sebelum kirim menfess lagi.`,
        429,
        null,
        {
          "Retry-After": String(Math.ceil(error.remainingMs / 1000)),
        },
      );
    }

    if (isApiError(error)) {
      return failure(error.message, error.status);
    }

    return internalServerError(error, "Error creating menfess:");
  }
}

export async function DELETE(request: Request) {
  const authorizationError = requireAdmin(request);
  if (authorizationError) {
    return authorizationError;
  }

  const input = await parseJson(request, menfessIdSchema);
  if (!input) {
    return failure("ID is required", 400);
  }

  try {
    await deleteMenfess(input.id);
    return success("Menfess deleted successfully", null);
  } catch (error) {
    if (isApiError(error)) {
      return failure(error.message, error.status);
    }

    if (error instanceof Error) {
      console.error("Failed to delete menfess:", error);
      return failure(error.message, 500);
    }

    return internalServerError(error, "Failed to delete menfess:");
  }
}

export function PUT() {
  return methodNotAllowed(["GET", "POST", "DELETE"]);
}
