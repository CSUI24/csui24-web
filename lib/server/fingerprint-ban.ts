import { ApiError } from "@/lib/api/errors";
import type { BanFingerprintInput } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";

const DEFAULT_BAN_REASON = "Banned from menfess admin panel";

export async function banFingerprint(input: BanFingerprintInput) {
  const menfess = await prisma.menfess.findUnique({
    where: { id: input.id },
    select: { fingerprint: true },
  });

  if (!menfess) {
    throw new ApiError(404, "Menfess not found");
  }

  if (!menfess.fingerprint) {
    throw new ApiError(400, "This menfess has no fingerprint data to ban");
  }

  const reason = input.reason || DEFAULT_BAN_REASON;
  await prisma.bannedFingerprint.upsert({
    where: { fingerprint: menfess.fingerprint },
    update: { reason },
    create: {
      fingerprint: menfess.fingerprint,
      reason,
    },
  });
}
