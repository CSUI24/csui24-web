import { json, methodNotAllowed, readJson } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { globalRateLimit } from "@/lib/rateLimiter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = globalRateLimit();
const enabledReactions = (process.env.NEXT_PUBLIC_ENABLED_REACTIONS ?? "")
  .split(",")
  .map((reaction) => reaction.trim())
  .filter(Boolean);

type ReactionInput = {
  menfessId?: unknown;
  type?: unknown;
  action?: unknown;
};

export async function POST(request: Request) {
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await readJson<ReactionInput>(request);
  const menfessId =
    typeof body?.menfessId === "string" ? body.menfessId.trim() : "";
  const type = typeof body?.type === "string" ? body.type.trim() : "";
  const action = body?.action === "remove" ? "remove" : "add";

  if (!menfessId || !type) {
    return json(
      { error: "Missing menfessId or type" },
      { status: 400 },
    );
  }

  if (!enabledReactions.includes(type)) {
    return json({ error: "Reaction type not allowed" }, { status: 400 });
  }

  try {
    if (action === "remove") {
      await prisma.reaction.updateMany({
        where: {
          menfessId,
          type,
          count: { gt: 0 },
        },
        data: {
          count: { decrement: 1 },
        },
      });
    } else {
      await prisma.reaction.upsert({
        where: {
          menfessId_type: { menfessId, type },
        },
        create: { menfessId, type, count: 1 },
        update: { count: { increment: 1 } },
      });
    }

    const updated = await prisma.reaction.findUnique({
      where: {
        menfessId_type: { menfessId, type },
      },
      select: {
        count: true,
      },
    });

    return json({
      success: true,
      newCount: updated?.count ?? 0,
    });
  } catch (error) {
    console.error("Error updating reaction:", error);
    return json({ error: "Database error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const menfessId = new URL(request.url).searchParams.get("menfessId")?.trim();

  if (!menfessId) {
    return json({ error: "Missing menfessId" }, { status: 400 });
  }

  try {
    const reactions = await prisma.reaction.findMany({
      where: { menfessId },
    });

    return json(reactions);
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return json({ error: "Database error" }, { status: 500 });
  }
}

export function PUT() {
  return methodNotAllowed(["GET", "POST"]);
}
