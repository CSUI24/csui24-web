import { getBearerToken, json, methodNotAllowed, readJson } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const token = getBearerToken(request);

  if (!token) {
    return json(
      {
        success: false,
        message: "Unauthorized: Missing or invalid token",
        data: null,
      },
      { status: 401 },
    );
  }

  if (token !== process.env.ADMIN_API_KEY) {
    return json(
      {
        success: false,
        message: "Forbidden: Invalid authorization token",
        data: null,
      },
      { status: 403 },
    );
  }

  const body = await readJson<{ id?: unknown; reason?: unknown }>(request);
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  const reason =
    typeof body?.reason === "string" && body.reason.trim().length > 0
      ? body.reason.trim()
      : "Banned from menfess admin panel";

  if (!id) {
    return json(
      {
        success: false,
        message: "ID is required",
        data: null,
      },
      { status: 400 },
    );
  }

  try {
    const menfess = await prisma.menfess.findUnique({
      where: { id },
      select: {
        fingerprint: true,
      },
    });

    if (!menfess) {
      return json(
        {
          success: false,
          message: "Menfess not found",
          data: null,
        },
        { status: 404 },
      );
    }

    if (!menfess.fingerprint) {
      return json(
        {
          success: false,
          message: "This menfess has no fingerprint data to ban",
          data: null,
        },
        { status: 400 },
      );
    }

    await prisma.bannedFingerprint.upsert({
      where: { fingerprint: menfess.fingerprint },
      update: { reason },
      create: {
        fingerprint: menfess.fingerprint,
        reason,
      },
    });

    return json({
      success: true,
      message: "User banned successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error banning fingerprint:", error);
    return json(
      {
        success: false,
        message: "Internal server error",
        data: null,
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return methodNotAllowed(["POST"]);
}
