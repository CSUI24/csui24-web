import { ApiError } from "@/lib/api/errors";
import type { MenfessCreateInput } from "@/lib/api/schemas";
import { parsePositiveInt } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getSsoSessionUser } from "@/lib/sso-session";
import { formatMenfessText } from "@/lib/menfess-text";
import { sendMenfessToDiscord } from "@/lib/server/discord";
import {
  hashGuestRequestIp,
  hashSsoIdentity,
} from "@/lib/server/menfess-ban-identifiers";
import {
  deleteMenfessImages,
  deleteStagedMenfessImages,
  getMenfessImageUrl,
  promoteStagedMenfessImages,
} from "@/lib/server/r2";

export const BANNED_MESSAGE = "MAMPUS LU GUA BAN AJGG BUAHAHHAHAHHA";
export const MENFESS_COOLDOWN_MS = 10 * 60 * 1000;

export class MenfessCooldownError extends Error {
  constructor(public readonly remainingMs: number) {
    super("Menfess cooldown is still active");
    this.name = "MenfessCooldownError";
  }
}

export function formatCooldown(remainingMs: number) {
  const totalSeconds = Math.max(1, Math.ceil(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds} detik`;
  }

  if (seconds === 0) {
    return `${minutes} menit`;
  }

  return `${minutes} menit ${seconds} detik`;
}

function containsLink(value: string) {
  return (
    /https?:\/\/[^\s]+/i.test(value) ||
    /www\.[^\s]+/i.test(value) ||
    /\.(com|net|org|id|io|dev|xyz|me|co|ai|app|tv|gov|edu|biz|info)(?:\b|\/)/i.test(
      value,
    )
  );
}

function assertSendable(input: MenfessCreateInput) {
  const totalLength = formatMenfessText(
    input.from,
    input.to,
    input.message,
  ).length;
  if (totalLength > 280) {
    throw new ApiError(
      400,
      "Menfess must not exceed 280 characters, including From/To labels.",
    );
  }

  const blockedWords = (process.env.BLOCKED_WORDS ?? "")
    .split(",")
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);
  const containsProhibitedWord = blockedWords.some((word) =>
    [input.to, input.from, input.message].some((field) =>
      field.toLowerCase().includes(word),
    ),
  );

  if (containsProhibitedWord) {
    throw new ApiError(
      400,
      "Your message has been flagged as inappropriate and cannot be sent.",
    );
  }

  if ([input.to, input.from, input.message].some(containsLink)) {
    throw new ApiError(
      400,
      "Input link are not allowed, if you want to send link, please contact one of ITDEV CSUI24 team",
    );
  }

  if (process.env.SENDING_MENFESS === "false") {
    throw new ApiError(403, "Currently sending menfess is not allowed");
  }
}

function getTweetId(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const tweet = payload as {
    tweet_id?: unknown;
    data?: {
      id?: unknown;
      create_tweet?: {
        tweet_results?: {
          result?: { rest_id?: unknown };
        };
      };
    };
  };

  const rawTweetId =
    tweet.tweet_id ??
    tweet.data?.id ??
    tweet.data?.create_tweet?.tweet_results?.result?.rest_id;

  return typeof rawTweetId === "string" && rawTweetId.length > 0
    ? rawTweetId
    : null;
}

async function publishTweet(
  input: Pick<MenfessCreateInput, "from" | "to" | "message">,
  menfessId: string,
) {
  let createdTweetId: string | null = null;

  try {

    const response = await fetch(
      `${process.env.TWITTER_SERVICE_URL}/api/v1/tweets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ADMIN_API_KEY}`,
        },
        body: JSON.stringify({
          tweet_text: formatMenfessText(input.from, input.to, input.message),
        }),
      },
    );
    const tweetId = getTweetId(await response.json());

    if (!tweetId) {
      throw new Error("Tweet service did not return a tweet_id");
    }
    createdTweetId = tweetId;

    await prisma.menfess.update({
      where: { id: menfessId },
      data: {
        isPosted: true,
        tweetId,
      },
    });
    return true;
  } catch (error) {
    if (createdTweetId) {
      try {
        await deleteTweetIfExists(createdTweetId);
      } catch (cleanupError) {
        console.error("Failed to clean up an unlinked tweet:", cleanupError);
      }
    }

    console.error("Failed to send tweet:", error);
    return false;
  }
}

async function notifyMenfessOnDiscord(input: {
  id: string;
  from: string;
  to: string;
  message: string;
  mode: "guest" | "sso";
  published: boolean;
  ssoName?: string | null;
  imageUrls: string[];
}) {
  try {
    await sendMenfessToDiscord(input);
  } catch (error) {
    console.error("Failed to send menfess to Discord:", error);
  }
}

export async function listPublicMenfess() {
  return prisma.menfess.findMany({
    where: { isBlocked: false, approvalStatus: "APPROVED" },
    select: {
      id: true,
      to: true,
      from: true,
      message: true,
      imageKeys: true,
      createdAt: true,
      reactions: {
        select: { type: true, count: true },
      },
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: parsePositiveInt(process.env.LIMIT_MENFESS),
  }).then((menfess) =>
    menfess.map(({ imageKeys, ...item }) => ({
      ...item,
      images: imageKeys.map(getMenfessImageUrl),
    })),
  );
}

export async function createMenfess(
  request: Request,
  input: MenfessCreateInput,
) {
  assertSendable(input);

  const ssoUser = input.mode === "sso" ? getSsoSessionUser(request) : null;
  if (input.mode === "sso" && !ssoUser) {
    throw new ApiError(401, "Login with UI SSO before sending this menfess");
  }

  const ipAddressHash =
    input.mode === "guest" ? hashGuestRequestIp(request) : null;
  const ssoIdentityHash = ssoUser
    ? hashSsoIdentity(ssoUser.username)
    : null;
  const [bannedFingerprint, bannedIpAddress, bannedSsoIdentity] =
    await Promise.all([
      input.mode === "guest"
        ? prisma.bannedFingerprint.findUnique({
            where: { fingerprint: input.fingerprint },
          })
        : Promise.resolve(null),
      ipAddressHash
        ? prisma.bannedIpAddress.findUnique({ where: { ipHash: ipAddressHash } })
        : Promise.resolve(null),
      ssoIdentityHash
        ? prisma.bannedSsoIdentity.findUnique({
            where: { identityHash: ssoIdentityHash },
          })
        : Promise.resolve(null),
    ]);
  const identityIsBanned =
    input.mode === "guest"
      ? Boolean(bannedFingerprint || bannedIpAddress)
      : Boolean(bannedSsoIdentity);

  const recentMenfess = await prisma.menfess.findFirst({
    where: {
      fingerprint: input.fingerprint,
      createdAt: {
        gte: new Date(Date.now() - MENFESS_COOLDOWN_MS),
      },
    },
    orderBy: { createdAt: "desc" },
    select: { createdAt: true },
  });

  if (recentMenfess) {
    const remainingMs =
      MENFESS_COOLDOWN_MS - (Date.now() - recentMenfess.createdAt.getTime());

    if (remainingMs > 0) {
      throw new MenfessCooldownError(remainingMs);
    }
  }

  const imageKeys = identityIsBanned
    ? []
    : await promoteStagedMenfessImages(input.imageKeys);
  let imageUrls: string[];
  try {
    imageUrls = imageKeys.map(getMenfessImageUrl);
  } catch (error) {
    await Promise.allSettled([deleteMenfessImages(imageKeys)]);
    throw error;
  }

  let menfess;
  try {
    menfess = await prisma.menfess.create({
      data: {
        to: input.to,
        from: input.from,
        message: input.message,
        imageKeys,
        fingerprint: input.fingerprint,
        ipAddressHash,
        isBlocked: identityIsBanned,
        approvalStatus: input.mode === "guest" ? "PENDING" : "APPROVED",
        resourceUsername: ssoUser?.username,
        resourceName: ssoUser?.name,
        resourceNpm: ssoUser?.npm,
        resourceOrganizationalCode: ssoUser?.organizationalCode,
      },
    });
  } catch (error) {
    await Promise.allSettled([
      deleteMenfessImages(imageKeys),
      deleteStagedMenfessImages(input.imageKeys),
    ]);
    throw error;
  }

  if (identityIsBanned) {
    await deleteStagedMenfessImages(input.imageKeys).catch((error) =>
      console.error("Failed to clean up blocked menfess image uploads:", error),
    );
    return { blocked: true };
  }

  if (input.mode === "guest") {
    await notifyMenfessOnDiscord({
      id: menfess.id,
      from: input.from,
      to: input.to,
      message: input.message,
      mode: "guest",
      published: false,
      imageUrls,
    });
    return { blocked: false, pendingReview: true };
  }

  const published = await publishTweet(input, menfess.id);
  await notifyMenfessOnDiscord({
    id: menfess.id,
    from: input.from,
    to: input.to,
    message: input.message,
    mode: "sso",
    published,
    ssoName: ssoUser?.name,
    imageUrls,
  });
  return { blocked: false, pendingReview: false };
}

export async function approveGuestMenfess(id: string) {
  const menfess = await prisma.menfess.findUnique({
    where: { id },
    select: {
      id: true,
      to: true,
      from: true,
      message: true,
      approvalStatus: true,
    },
  });

  if (!menfess) {
    throw new ApiError(404, "Menfess not found");
  }

  if (menfess.approvalStatus !== "PENDING") {
    throw new ApiError(409, "Only pending guest menfess can be approved");
  }

  const update = await prisma.menfess.updateMany({
    where: { id, approvalStatus: "PENDING" },
    data: { approvalStatus: "APPROVED" },
  });

  if (update.count !== 1) {
    throw new ApiError(409, "This menfess has already been reviewed");
  }

  const published = await publishTweet(menfess, menfess.id);
  return { published };
}

export async function declineGuestMenfess(id: string) {
  const menfess = await prisma.menfess.findUnique({
    where: { id },
    select: { imageKeys: true },
  });

  const update = await prisma.menfess.updateMany({
    where: { id, approvalStatus: "PENDING" },
    data: { approvalStatus: "REJECTED" },
  });

  if (update.count === 1) {
    await prisma.menfess.update({ where: { id }, data: { imageKeys: [] } });
    await deleteMenfessImages(menfess?.imageKeys ?? []).catch((error) =>
      console.error("Failed to delete declined menfess images:", error),
    );
    return;
  }

  const menfess = await prisma.menfess.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!menfess) {
    throw new ApiError(404, "Menfess not found");
  }

  throw new ApiError(409, "Only pending guest menfess can be declined");
}

async function deleteTweetIfExists(tweetId: string) {
  const serviceUrl = process.env.TWITTER_SERVICE_URL;
  const adminApiKey = process.env.ADMIN_API_KEY;

  if (!serviceUrl || !adminApiKey) {
    throw new Error("Twitter service configuration is incomplete");
  }

  const response = await fetch(`${serviceUrl}/api/v1/tweets/${tweetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${adminApiKey}`,
    },
  });

  if (response.ok || response.status === 404) {
    return;
  }

  throw new Error(
    `Failed to delete tweet ${tweetId}: ${response.status} ${await response.text()}`,
  );
}

export async function deleteMenfess(id: string) {
  const menfess = await prisma.menfess.findUnique({
    where: { id },
    select: {
      id: true,
      tweetId: true,
      imageKeys: true,
    },
  });

  if (!menfess) {
    throw new ApiError(404, "Menfess not found");
  }

  if (menfess.tweetId) {
    await deleteTweetIfExists(menfess.tweetId);
  }

  await prisma.$transaction([
    prisma.comment.deleteMany({ where: { menfessId: id } }),
    prisma.reaction.deleteMany({ where: { menfessId: id } }),
    prisma.menfess.delete({ where: { id } }),
  ]);

  await deleteMenfessImages(menfess.imageKeys).catch((error) =>
    console.error("Failed to delete menfess images:", error),
  );
}
