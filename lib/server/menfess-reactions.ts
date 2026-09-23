import type { ReactionInput } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";

export function getEnabledReactions() {
  return (process.env.NEXT_PUBLIC_ENABLED_REACTIONS ?? "")
    .split(",")
    .map((reaction) => reaction.trim())
    .filter(Boolean);
}

export function listReactions(menfessId: string) {
  return prisma.reaction.findMany({ where: { menfessId } });
}

export async function updateReaction(input: ReactionInput) {
  if (input.action === "remove") {
    await prisma.reaction.updateMany({
      where: {
        menfessId: input.menfessId,
        type: input.type,
        count: { gt: 0 },
      },
      data: { count: { decrement: 1 } },
    });
  } else {
    await prisma.reaction.upsert({
      where: {
        menfessId_type: {
          menfessId: input.menfessId,
          type: input.type,
        },
      },
      create: {
        menfessId: input.menfessId,
        type: input.type,
        count: 1,
      },
      update: { count: { increment: 1 } },
    });
  }

  const reaction = await prisma.reaction.findUnique({
    where: {
      menfessId_type: {
        menfessId: input.menfessId,
        type: input.type,
      },
    },
    select: { count: true },
  });

  return reaction?.count ?? 0;
}
