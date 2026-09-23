import { json, methodNotAllowed, readJson } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { globalRateLimit } from "@/lib/rateLimiter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = globalRateLimit();

type CommentInput = {
  menfessId?: unknown;
  content?: unknown;
  author?: unknown;
};

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim();

  if (!id) {
    return json(
      {
        success: false,
        message: "Missing menfess ID",
        data: null,
      },
      { status: 400 },
    );
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { menfessId: id },
      select: {
        author: true,
        content: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return json({
      success: true,
      message: "Menfess Comment fetched successfully",
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching menfess comments:", error);
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
  const rateLimitResponse = rateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await readJson<CommentInput>(request);
  const menfessId =
    typeof body?.menfessId === "string" ? body.menfessId.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  const author = typeof body?.author === "string" ? body.author.trim() : "";

  if (content.length > 200) {
    return json(
      {
        success: false,
        message: "Comment too long",
        data: null,
      },
      { status: 400 },
    );
  }

  if (!menfessId || !content) {
    return json(
      {
        success: false,
        message: "Missing menfess ID or content",
        data: null,
      },
      { status: 400 },
    );
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        menfessId,
        content,
        ...(author ? { author } : {}),
      },
      select: {
        author: true,
        content: true,
        createdAt: true,
      },
    });

    return json({
      success: true,
      message: "Menfess Comment created successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error creating menfess comment:", error);
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
