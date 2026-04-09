import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

const getAdminToken = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1] ?? null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
      data: null,
    });
  }

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

  const { id, reason } = req.body ?? {};

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
        fingerprint: true,
      },
    });

    if (!menfess) {
      return res.status(404).json({
        success: false,
        message: "Menfess not found",
        data: null,
      });
    }

    if (!menfess.fingerprint) {
      return res.status(400).json({
        success: false,
        message: "This menfess has no fingerprint data to ban",
        data: null,
      });
    }

    await prisma.bannedFingerprint.upsert({
      where: {
        fingerprint: menfess.fingerprint,
      },
      update: {
        reason:
          typeof reason === "string" && reason.trim().length > 0
            ? reason.trim()
            : "Banned from menfess admin panel",
      },
      create: {
        fingerprint: menfess.fingerprint,
        reason:
          typeof reason === "string" && reason.trim().length > 0
            ? reason.trim()
            : "Banned from menfess admin panel",
      },
    });

    return res.status(200).json({
      success: true,
      message: "User banned successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error banning fingerprint:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
}
