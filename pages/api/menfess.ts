import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/lib/generated/prisma";
import { TwitterApi } from "twitter-api-v2";
import { briefFamsData } from "@/modules/fams-data";
import { globalRateLimit } from "@/lib/rateLimiter";
import { detectHate } from "@/lib/detectHate";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
    if (!globalRateLimit(req, res)) return;
    const { to, from, message } = req.body;

    if (!to || !from || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
    const filter = [
      "memek",
      "kntl",
      "ddp2",
      "ade azurat",
      "kontol",
      "memek",
      "pantek",
      "slot gacor",
      "gacor maxwin",
      "maxwin",
      "jud1",
      "sl0t",
      "s1tus",
      "g4cor",
      "situs terpercaya",
      "situs slot",
      "situs slot gacor",
      "situs slot gacor terpercaya",
      "situs slot gacor maxwin",
      "situs slot gacor maxwin terpercaya",
      "judi slot",
      "judi online",
      "judi slot",
      "judi slot online",
      "judi slot gacor",
      "judi slot gacor terpercaya",
      "judi slot gacor maxwin",
      "judi slot gacor maxwin terpercaya",
      "situs judi",
      "situs judi online",
      "situs judi slot",
      "situs judi slot online",
      "situs judi slot gacor",
      "situs judi slot gacor terpercaya",
      "situs judi slot gacor maxwin",
      "situs judi slot gacor maxwin terpercaya",
      "(.)com",
      "(.)net",
      "(.)org",
      "(.)id",
      "(.)io",
    ];
    const containsProhibitedWord = filter.some((word) =>
      [to, from, message].some((field) => field.toLowerCase().includes(word))
    );

    if (containsProhibitedWord) {
      return res.status(400).json({
        success: false,
        message: "Input contains prohibited words",
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

    const status = await detectHate(message);

    if (status === "ERROR") {
      return res.status(200).json({
        success: true,
        message: "LLM Error",
        data: null,
      });
    }

    if (status === "HATEFUL") {
      return res.status(403).json({
        success: false,
        message: "Message is indicated to be hateful speech",
        data: null,
      });
    }

    try {
      const newMenfess = await prisma.menfess.create({
        data: {
          to,
          from,
          message,
        },
      });

      try {
        if (!process.env.X_API_KEY || process.env.PRODUCTION === "false") {
          throw new Error(
            "You are not allowed to send tweet from this environment"
          );
        }
        const twitterClient = new TwitterApi({
          appKey: process.env.X_API_KEY!,
          appSecret: process.env.X_API_KEY_SECRET!,
          accessToken: process.env.X_ACCESS_TOKEN!,
          accessSecret: process.env.X_ACCESS_TOKEN_SECRET!,
        });
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
        const tweet = await twitterClient.v2.tweet(
          `From : ${FromMessage}\nTo : ${ToMessage}\n\n${message}`
        );
        console.log("Tweet sent successfully:", tweet);
        await prisma.menfess.update({
          where: { id: newMenfess.id },
          data: {
            isPosted: true,
          },
        });
      } catch (e) {
        console.log("Failed to send tweet", e);
      }

      return res.status(200).json({
        success: true,
        message: "Menfess created successfully",
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
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token",
        data: null,
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token (replace with your actual token validation logic)
    if (token !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid authorization token",
        data: null,
      });
    }
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
        data: null,
      });
    }
    try {
      await prisma.comment.deleteMany({
        where: {
          menfessId: id,
        },
      });
      await prisma.reaction.deleteMany({
        where: { menfessId: id },
      });
      await prisma.menfess.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Menfess deleted successfully",
        data: null,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
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
