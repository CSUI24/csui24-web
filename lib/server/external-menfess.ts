import { prisma } from "@/lib/prisma";

export function listUnpostedMenfess() {
  return prisma.menfess.findMany({
    select: {
      id: true,
      to: true,
      from: true,
      message: true,
      createdAt: true,
    },
    where: { isPosted: false },
    orderBy: { createdAt: "desc" },
  });
}

export function markMenfessAsPosted(id: string) {
  return prisma.menfess.update({
    where: { id },
    data: { isPosted: true },
  });
}
