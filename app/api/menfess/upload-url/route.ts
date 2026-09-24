import {
  failure,
  internalServerError,
  methodNotAllowed,
  parseJson,
  success,
} from "@/lib/api";
import { isApiError } from "@/lib/api/errors";
import { menfessImageUploadSchema } from "@/lib/api/schemas";
import { globalRateLimit } from "@/lib/rateLimiter";
import { createMenfessImageUpload } from "@/lib/server/r2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = globalRateLimit(20);

export async function POST(request: Request) {
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const input = await parseJson(request, menfessImageUploadSchema);
  if (!input) {
    return failure("Choose 1 to 4 supported images, each no larger than 1 MB.", 400);
  }

  try {
    const uploads = await Promise.all(
      input.files.map((file) => createMenfessImageUpload(file)),
    );
    return success("Image upload links created", uploads);
  } catch (error) {
    if (isApiError(error)) return failure(error.message, error.status);
    return internalServerError(error, "Error creating menfess image upload links:");
  }
}

export function GET() {
  return methodNotAllowed(["POST"]);
}
