import { briefFamsData } from "@/modules/fams-data";
import { getBearerToken, json, methodNotAllowed, parsePositiveInt, readJson } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { globalRateLimit } from "@/lib/rateLimiter";
import { getResourceSessionLookup } from "@/lib/resourceSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limit = globalRateLimit(1);
const BANNED_MESSAGE = "MAMPUS LU GUA BAN AJGG BUAHAHHAHAHHA";
const MENFESS_COOLDOWN_MS = 24 * 60 * 60 * 1000;

type MenfessInput = {
  to?: unknown;
  from?: unknown;
  message?: unknown;
  fingerprint?: unknown;
};

function asNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function formatCooldown(remainingMs: number) {
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

function isLink(value: string) {
  return (
    /https?:\/\/[^\s]+/i.test(value) ||
    /www\.[^\s]+/i.test(value) ||
    /\.(com|net|org|id|io|dev|xyz|me|co|ai|app|tv|gov|edu|biz|info)(?:\b|\/)/i.test(value)
  );
}

function getTweetIdFromResponse(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const tweet = payload as {
    tweet_id?: unknown;
    data?: {
      id?: unknown;
      create_tweet?: {
        tweet_results?: {
          result?: {
            rest_id?: unknown;
          };
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

  const errorText = await response.text();
  throw new Error(
    `Failed to delete tweet ${tweetId}: ${response.status} ${errorText}`,
  );
}

export async function GET() {
  try {
    const data = await prisma.menfess.findMany({
      where: {
        isBlocked: false,
      },
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
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: parsePositiveInt(process.env.LIMIT_MENFESS),
    });

    return json({
      success: true,
      message: "Menfess fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching menfess:", error);
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
  const rateLimitResponse = limit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const body = await readJson<MenfessInput>(request);
  const to = asNonEmptyString(body?.to);
  const from = asNonEmptyString(body?.from);
  const message = asNonEmptyString(body?.message);
  const fingerprint = asNonEmptyString(body?.fingerprint);

  if (!to || !from || !message) {
    return json(
      {
        success: false,
        message: "All fields are required",
        data: null,
      },
      { status: 400 },
    );
  }

  if (!fingerprint) {
    return json(
      {
        success: false,
        message: "Fingerprint is required",
        data: null,
      },
      { status: 400 },
    );
  }

  if (to.length + from.length + message.length > 280) {
    return json(
      {
        success: false,
        message: "Total characters (from + to + message) must not exceed 280",
        data: null,
      },
      { status: 400 },
    );
  }

  const blockedWords = (process.env.BLOCKED_WORDS ?? "")
    .split(",")
    .map((word) => word.trim().toLowerCase())
    .filter(Boolean);
  const containsProhibitedWord = blockedWords.some((word) =>
    [to, from, message].some((field) => field.toLowerCase().includes(word)),
  );

  if (containsProhibitedWord) {
    return json(
      {
        success: false,
        message:
          "Your message has been flagged as inappropriate and cannot be sent.",
        data: null,
      },
      { status: 400 },
    );
  }

  if (isLink(to) || isLink(from) || isLink(message)) {
    return json(
      {
        success: false,
        message:
          "Input link are not allowed, if you want to send link, please contact one of ITDEV CSUI24 team",
        data: null,
      },
      { status: 400 },
    );
  }

  if (process.env.SENDING_MENFESS === "false") {
    return json(
      {
        success: false,
        message: "Currently sending menfess is not allowed",
        data: null,
      },
      { status: 403 },
    );
  }

  const bannedFingerprint = await prisma.bannedFingerprint.findUnique({
    where: { fingerprint },
  });
  const isBlocked = Boolean(bannedFingerprint);

  const recentMenfess = await prisma.menfess.findFirst({
    where: {
      fingerprint,
      createdAt: {
        gte: new Date(Date.now() - MENFESS_COOLDOWN_MS),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      createdAt: true,
    },
  });

  if (recentMenfess) {
    const remainingMs =
      MENFESS_COOLDOWN_MS - (Date.now() - recentMenfess.createdAt.getTime());

    if (remainingMs > 0) {
      return json(
        {
          success: false,
          message: `Tunggu ${formatCooldown(remainingMs)} sebelum kirim menfess lagi.`,
          data: null,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(remainingMs / 1000)),
          },
        },
      );
    }
  }

  try {
    const resourceSession = await getResourceSessionLookup(request);
    const resourceUser = resourceSession.user;
    console.info("Menfess resource session lookup", {
      status: resourceSession.status,
      hasSessionCookie: resourceSession.hasSessionCookie,
      resourceStatus: resourceSession.resourceStatus,
      hasResourceUser: Boolean(resourceUser),
    });

    const newMenfess = await prisma.menfess.create({
      data: {
        to,
        from,
        message,
        fingerprint,
        isBlocked,
        resourceUserId: resourceUser?.id,
        resourceUsername: resourceUser?.username,
        resourceName: resourceUser?.name,
        resourceEmail: resourceUser?.email,
        resourceNpm: resourceUser?.npm,
        resourceOrganizationalCode: resourceUser?.organizationalCode,
      },
    });

    if (isBlocked) {
      return json(
        {
          success: false,
          message: BANNED_MESSAGE,
          data: null,
        },
        { status: 403 },
      );
    }

    try {
      if (process.env.PRODUCTION === "false") {
        throw new Error("Skipping tweet in non-production environment");
      }

      const fromUser =
        briefFamsData.find((fam) => fam.id === from.replace("fams/", ""))?.[
          "full-name"
        ] || "";
      const toUser =
        briefFamsData.find((fam) => fam.id === to.replace("fams/", ""))?.[
          "full-name"
        ] || "";
      const fromMessage = fromUser ? `${fromUser} CSUI24` : from;
      const toMessage = toUser ? `${toUser} CSUI24` : to;
      const response = await fetch(
        `${process.env.TWITTER_SERVICE_URL}/api/v1/tweets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ADMIN_API_KEY}`,
          },
          body: JSON.stringify({
            tweet_text: `From : ${fromMessage}\nTo : ${toMessage}\n\n${message}`,
          }),
        },
      );
      const tweet = await response.json();
      const tweetId = getTweetIdFromResponse(tweet);

      if (!tweetId) {
        throw new Error("Tweet service did not return a tweet_id");
      }

      await prisma.menfess.update({
        where: { id: newMenfess.id },
        data: {
          isPosted: true,
          tweetId,
        },
      });
    } catch (error) {
      console.error("Failed to send tweet:", error);
    }

    return json({
      success: true,
      message: "Menfess sent successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error creating menfess:", error);
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

export async function DELETE(request: Request) {
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

  const body = await readJson<{ id?: unknown }>(request);
  const id = asNonEmptyString(body?.id);

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
        id: true,
        tweetId: true,
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

    if (menfess.tweetId) {
      await deleteTweetIfExists(menfess.tweetId);
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { menfessId: id } }),
      prisma.reaction.deleteMany({ where: { menfessId: id } }),
      prisma.menfess.delete({ where: { id } }),
    ]);

    return json({
      success: true,
      message: "Menfess deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Failed to delete menfess:", error);
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete the menfess",
        data: null,
      },
      { status: 500 },
    );
  }
}

export function PUT() {
  return methodNotAllowed(["GET", "POST", "DELETE"]);
}
