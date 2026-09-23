import {
  failure,
  internalServerError,
  methodNotAllowed,
  parseJson,
  success,
} from "@/lib/api";
import { requireAdmin } from "@/lib/api/auth";
import { banFingerprintSchema } from "@/lib/api/schemas";
import { isApiError } from "@/lib/api/errors";
import { banFingerprint } from "@/lib/server/fingerprint-ban";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authorizationError = requireAdmin(request);
  if (authorizationError) {
    return authorizationError;
  }

  const input = await parseJson(request, banFingerprintSchema);
  if (!input) {
    return failure("ID is required", 400);
  }

  try {
    await banFingerprint(input);
    return success("User banned successfully", null);
  } catch (error) {
    if (isApiError(error)) {
      return failure(error.message, error.status);
    }

    return internalServerError(error, "Error banning fingerprint:");
  }
}

export function GET() {
  return methodNotAllowed(["POST"]);
}
