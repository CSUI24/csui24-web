import { json, methodNotAllowed, readJson } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.menfess.findMany({
      select: {
        id: true,
        to: true,
        from: true,
        message: true,
        createdAt: true,
      },
      where: {
        isPosted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return json({
      success: true,
      message: "Menfess fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching external menfess:", error);
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

export async function POST(request: Request) {
  const body = await readJson<{ id?: unknown }>(request);
  const id = typeof body?.id === "string" ? body.id.trim() : "";

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
    await prisma.menfess.update({
      where: { id },
      data: { isPosted: true },
    });

    return json({
      success: true,
      message: "Menfess posted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error posting external menfess:", error);
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

export function PUT() {
  return methodNotAllowed(["GET", "POST"]);
}
