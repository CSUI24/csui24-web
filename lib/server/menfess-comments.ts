import { ApiError } from "@/lib/api/errors";
import type { CommentCreateInput } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";

export function listComments(menfessId: string) {
  return prisma.comment.findMany({
    where: { menfessId },
    select: {
      author: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export function createComment(input: CommentCreateInput) {
  if (input.content.length > 200) {
    throw new ApiError(400, "Comment too long");
  }

  return prisma.comment.create({
    data: {
      menfessId: input.menfessId,
      content: input.content,
      ...(input.author ? { author: input.author } : {}),
    },
    select: {
      author: true,
      content: true,
      createdAt: true,
    },
  });
}
