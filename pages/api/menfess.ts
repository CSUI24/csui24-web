import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/lib/generated/prisma";
import { briefFamsData } from "@/modules/fams-data";
import { globalRateLimit } from "@/lib/rateLimiter";

const limit = globalRateLimit(1);
const prisma = new PrismaClient();
const BANNED_MESSAGE = "MAMPUS LU GUA BAN AJGG BUAHAHHAHAHHA";
const MENFESS_COOLDOWN_MS = 5 * 60 * 1000;

const normalizeFingerprint = (value: unknown) => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const getAdminToken = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1] ?? null;
};

const getTweetIdFromResponse = (payload: unknown) => {
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
};

const formatCooldown = (remainingMs: number) => {
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
};

const deleteTweetIfExists = async (tweetId: string) => {
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
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const data = await prisma.menfess.findMany({
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
            comments: true, // jumlah komentar
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: process.env.LIMIT_MENFESS
        ? parseInt(process.env.LIMIT_MENFESS)
        : undefined,
    });
    return res.status(200).json({
      success: true,
      message: "Menfess fetched successfully",
      data,
    });
  } else if (req.method === "POST") {
    if (!limit(req, res)) return;
    const { to, from, message, fingerprint: rawFingerprint } = req.body ?? {};
    const fingerprint = normalizeFingerprint(rawFingerprint);

    if (!to || !from || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }

    if (!fingerprint) {
      return res.status(400).json({
        success: false,
        message: "Fingerprint is required",
        data: null,
      });
    }

    console.log(message.length);
    if (to.length > 60 || from.length > 60 || message.length > 280) {
      return res.status(400).json({
        success: false,
        message: "Input exceeds maximum length",
        data: null,
      });
    }
    const filter = (process.env.BLOCKED_WORDS || "")
      .split(",")
      .map((word) => word.trim().toLowerCase());
    const containsProhibitedWord = filter.some((word) =>
      [to, from, message].some((field) => field.toLowerCase().includes(word)),
    );

    if (containsProhibitedWord) {
      return res.status(400).json({
        success: false,
        message:
          "Your message has been flagged as inappropriate and cannot be sent.",
        data: null,
      });
    }
    const isLink = (str: string) => {
      const regex = /https?:\/\/[^\s]+/;
      const regex2 = /www\.[^\s]+/;
      const domainRegex =
        /\.(com|net|org|id|io|dev|xyz|me|co|ai|app|tv|gov|edu|biz|info)/i;
      return regex.test(str) || regex2.test(str) || domainRegex.test(str);
    };
    if (isLink(to) || isLink(from) || isLink(message)) {
      return res.status(400).json({
        success: false,
        message:
          "Input link are not allowed, if you want to send link, please contact one of ITDEV CSUI24 team",
        data: null,
      });
    }
    if (process.env.SENDING_MENFESS === "false") {
      return res.status(403).json({
        success: false,
        message: "Currently sending menfess is not allowed",
        data: null,
      });
    }

    const bannedFingerprint = await prisma.bannedFingerprint.findUnique({
      where: {
        fingerprint,
      },
    });

    if (bannedFingerprint) {
      return res.status(403).json({
        success: false,
        message: BANNED_MESSAGE,
        data: null,
      });
    }

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
      const elapsedMs = Date.now() - recentMenfess.createdAt.getTime();
      const remainingMs = MENFESS_COOLDOWN_MS - elapsedMs;

      if (remainingMs > 0) {
        res.setHeader("Retry-After", Math.ceil(remainingMs / 1000));

        return res.status(429).json({
          success: false,
          message: `Tunggu ${formatCooldown(remainingMs)} sebelum kirim menfess lagi.`,
          data: null,
        });
      }
    }

    try {
      const newMenfess = await prisma.menfess.create({
        data: {
          to,
          from,
          message,
          fingerprint,
        },
      });

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
        const FromMessage = fromUser ? fromUser + " CSUI24" : from;
        const ToMessage = toUser ? toUser + " CSUI24" : to;
        const tweet = await fetch(
          process.env.TWITTER_SERVICE_URL + "/api/v1/tweets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.ADMIN_API_KEY}`,
            },
            body: JSON.stringify({
              tweet_text: `From : ${FromMessage}\nTo : ${ToMessage}\n\n${message}`,
            }),
          },
        ).then((res) => res.json());
        console.log("Twitter service response:", tweet);
        const tweetId = getTweetIdFromResponse(tweet);

        if (!tweetId) {
          throw new Error("Tweet service did not return a tweet_id");
        }

        console.log("Tweet sent successfully:", tweet);
        await prisma.menfess.update({
          where: { id: newMenfess.id },
          data: {
            isPosted: true,
            tweetId,
          },
        });
      } catch (e) {
        console.log("Failed to send tweet", e);
      }

      return res.status(200).json({
        success: true,
        message: "Menfess sent successfully",
        data: null,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  } else if (req.method === "DELETE") {
    const token = getAdminToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token",
        data: null,
      });
    }

    if (token !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid authorization token",
        data: null,
      });
    }
    const { id } = req.body ?? {};

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
        data: null,
      });
    }

    try {
      const menfess = await prisma.menfess.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          tweetId: true,
        },
      });

      if (!menfess) {
        return res.status(404).json({
          success: false,
          message: "Menfess not found",
          data: null,
        });
      }

      if (menfess.tweetId) {
        await deleteTweetIfExists(menfess.tweetId);
      }

      await prisma.$transaction([
        prisma.comment.deleteMany({
          where: {
            menfessId: id,
          },
        }),
        prisma.reaction.deleteMany({
          where: { menfessId: id },
        }),
        prisma.menfess.delete({
          where: {
            id,
          },
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: "Menfess deleted successfully",
        data: null,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        success: false,
        message:
          e instanceof Error ? e.message : "Failed to delete the menfess",
        data: null,
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
      data: null,
    });
  }
}
