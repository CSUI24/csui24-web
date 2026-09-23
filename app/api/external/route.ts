import {
  failure,
  internalServerError,
  methodNotAllowed,
  parseJson,
  success,
} from "@/lib/api";
import { menfessIdSchema } from "@/lib/api/schemas";
import { requireAdmin } from "@/lib/api/auth";
import {
  listUnpostedMenfess,
  markMenfessAsPosted,
} from "@/lib/server/external-menfess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authorizationError = requireAdmin(request);
  if (authorizationError) {
    return authorizationError;
  }

  try {
    const data = await listUnpostedMenfess();
    return success("Menfess fetched successfully", data);
  } catch (error) {
    return internalServerError(error, "Error fetching external menfess:");
  }
}

export async function POST(request: Request) {
  const authorizationError = requireAdmin(request);
  if (authorizationError) {
    return authorizationError;
  }

  const input = await parseJson(request, menfessIdSchema);
  if (!input) {
    return failure("ID is required", 400);
  }

  try {
    await markMenfessAsPosted(input.id);
    return success("Menfess posted successfully", null);
  } catch (error) {
    return internalServerError(error, "Error posting external menfess:");
  }
}

export function PUT() {
  return methodNotAllowed(["GET", "POST"]);
}
