import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/lib/generated/prisma";
import { globalRateLimit } from "@/lib/rateLimiter";

const prisma = new PrismaClient();
const rateLimit = globalRateLimit();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Missing menfess ID",
        data: null,
      });
    }
    try {
      const menfessId = Array.isArray(id) ? id[0] : id;
      const menfessComment = await prisma.comment.findMany({
        where: {
          menfessId: menfessId,
        },
        select: {
          author: true,
          content: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (!menfessComment) {
        return res.status(404).json({
          success: false,
          message: "Menfess not found",
          data: null,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Menfess Comment fetched successfully",
        data: menfessComment,
      });
    } catch (error) {
      console.error("Error fetching menfess:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  } else if (req.method === "POST") {
    if (!rateLimit(req, res)) return;
    const { menfessId, content, author } = req.body;
    if (content.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Comment too long",
        data: null,
      });
    }
    if (!menfessId || !content) {
      return res.status(400).json({
        success: false,
        message: "Missing menfess ID or content",
        data: null,
      });
    }
    try {
      const menfessComment = await prisma.comment.create({
        data: {
          menfessId: menfessId,
          author: author,
          content: content,
        },
      });

      if (!menfessComment) {
        return res.status(404).json({
          success: false,
          message: "Error creating menfess comment",
          data: null,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Menfess Comment created successfully",
        data: menfessComment,
      });
    } catch (error) {
      console.error("Error creating menfess:", error);
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
