import { ApiError } from "@/lib/api/errors";
import { prisma } from "@/lib/prisma";
import { hashSsoIdentity } from "@/lib/server/menfess-ban-identifiers";

const BAN_REASON = "Banned via Discord moderation";

export async function banMenfessIdentity(menfessId: string) {
  const menfess = await prisma.menfess.findUnique({
    where: { id: menfessId },
    select: {
      resourceUsername: true,
      fingerprint: true,
      ipAddressHash: true,
      approvalStatus: true,
    },
  });

  if (!menfess) {
    throw new ApiError(404, "Menfess not found");
  }

  if (menfess.resourceUsername) {
    const identityHash = hashSsoIdentity(menfess.resourceUsername);
    await prisma.bannedSsoIdentity.upsert({
      where: { identityHash },
      update: { reason: BAN_REASON },
      create: {
        identityHash,
        reason: BAN_REASON,
      },
    });

    return { mode: "sso" as const };
  }

  if (!menfess.fingerprint && !menfess.ipAddressHash) {
    throw new ApiError(400, "This menfess has no guest identity data to ban");
  }

  await prisma.$transaction(async (tx) => {
    if (menfess.fingerprint) {
      await tx.bannedFingerprint.upsert({
        where: { fingerprint: menfess.fingerprint },
        update: { reason: BAN_REASON },
        create: {
          fingerprint: menfess.fingerprint,
          reason: BAN_REASON,
        },
      });
    }

    if (menfess.ipAddressHash) {
      await tx.bannedIpAddress.upsert({
        where: { ipHash: menfess.ipAddressHash },
        update: { reason: BAN_REASON },
        create: {
          ipHash: menfess.ipAddressHash,
          reason: BAN_REASON,
        },
      });
    }
  });

  return {
    mode: "guest" as const,
    fingerprintBanned: Boolean(menfess.fingerprint),
    ipBanned: Boolean(menfess.ipAddressHash),
    approvalStatus: menfess.approvalStatus,
  };
}
