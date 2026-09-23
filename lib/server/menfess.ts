import { briefFamsData } from "@/modules/fams-data";
import { ApiError } from "@/lib/api/errors";
import type { MenfessCreateInput } from "@/lib/api/schemas";
import { parsePositiveInt } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getSsoSessionUser } from "@/lib/sso-session";

export const BANNED_MESSAGE = "MAMPUS LU GUA BAN AJGG BUAHAHHAHAHHA";
export const MENFESS_COOLDOWN_MS = 24 * 60 * 60 * 1000;

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
  const totalLength =
    input.to.length + input.from.length + input.message.length;
  if (totalLength > 280) {
    throw new ApiError(
      400,
      "Total characters (from + to + message) must not exceed 280",
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

async function publishTweet(input: MenfessCreateInput, menfessId: string) {
  try {
    if (process.env.PRODUCTION === "false") {
      throw new Error("Skipping tweet in non-production environment");
    }

    const fromUser =
      briefFamsData.find((fam) => fam.id === input.from.replace("fams/", ""))?.[
        "full-name"
      ] || "";
    const toUser =
      briefFamsData.find((fam) => fam.id === input.to.replace("fams/", ""))?.[
        "full-name"
      ] || "";
    const response = await fetch(
      `${process.env.TWITTER_SERVICE_URL}/api/v1/tweets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ADMIN_API_KEY}`,
        },
        body: JSON.stringify({
          tweet_text: `From : ${fromUser ? `${fromUser} CSUI24` : input.from}\nTo : ${toUser ? `${toUser} CSUI24` : input.to}\n\n${input.message}`,
        }),
      },
    );
    const tweetId = getTweetId(await response.json());

    if (!tweetId) {
      throw new Error("Tweet service did not return a tweet_id");
    }

    await prisma.menfess.update({
      where: { id: menfessId },
      data: {
        isPosted: true,
        tweetId,
      },
    });
  } catch (error) {
    console.error("Failed to send tweet:", error);
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
  });
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

  const bannedFingerprint = await prisma.bannedFingerprint.findUnique({
    where: { fingerprint: input.fingerprint },
  });

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

  const menfess = await prisma.menfess.create({
    data: {
      to: input.to,
      from: input.from,
      message: input.message,
      fingerprint: input.fingerprint,
      isBlocked: Boolean(bannedFingerprint),
      approvalStatus: input.mode === "guest" ? "PENDING" : "APPROVED",
      ssoUsername: ssoUser?.username,
      ssoName: ssoUser?.name,
      ssoNpm: ssoUser?.npm,
      ssoOrganizationalCode: ssoUser?.organizationalCode,
    },
  });

  if (bannedFingerprint) {
    return { blocked: true };
  }

  if (input.mode === "guest") {
    return { blocked: false, pendingReview: true };
  }

  await publishTweet(input, menfess.id);
  return { blocked: false, pendingReview: false };
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
}
