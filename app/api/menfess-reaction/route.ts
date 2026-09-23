import { failure, json, methodNotAllowed, parseJson } from "@/lib/api";
import { reactionSchema } from "@/lib/api/schemas";
import { globalRateLimit } from "@/lib/rateLimiter";
import {
  getEnabledReactions,
  listReactions,
  updateReaction,
} from "@/lib/server/menfess-reactions";
import { getSsoSessionUser } from "@/lib/sso-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = globalRateLimit();

export async function POST(request: Request) {
  if (!getSsoSessionUser(request)) {
    return failure("Login with UI SSO to react to menfess", 401);
  }

  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const input = await parseJson(request, reactionSchema);
  if (!input) {
    return json({ error: "Missing menfessId or type" }, { status: 400 });
  }

  if (!getEnabledReactions().includes(input.type)) {
    return json({ error: "Reaction type not allowed" }, { status: 400 });
  }

  try {
    const newCount = await updateReaction(input);
    return json({ success: true, newCount });
  } catch (error) {
    console.error("Error updating reaction:", error);
    return json({ error: "Database error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!getSsoSessionUser(request)) {
    return failure("Login with UI SSO to view menfess", 401);
  }

  const menfessId = new URL(request.url).searchParams.get("menfessId")?.trim();
  if (!menfessId) {
    return json({ error: "Missing menfessId" }, { status: 400 });
  }

  try {
    return json(await listReactions(menfessId));
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return json({ error: "Database error" }, { status: 500 });
  }
}

export function PUT() {
  return methodNotAllowed(["GET", "POST"]);
}
