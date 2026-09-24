import { z } from "zod";

const requiredText = z.string().trim().min(1);
const optionalText = z.string().trim().optional();

export const menfessInputSchema = z.object({
  to: optionalText,
  from: optionalText,
  message: optionalText,
  fingerprint: optionalText,
  mode: z.enum(["guest", "sso"]).optional(),
});

export const menfessCreateSchema = z.object({
  to: requiredText,
  from: requiredText,
  message: requiredText,
  fingerprint: requiredText,
  mode: z.enum(["guest", "sso"]),
  imageKeys: z.array(requiredText).max(4).default([]),
});

export const menfessImageUploadSchema = z.object({
  files: z
    .array(
      z.object({
        contentType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        size: z.number().int().min(1).max(1_048_576),
      }),
    )
    .min(1)
    .max(4),
});

export const menfessIdSchema = z.object({
  id: requiredText,
});

export const banFingerprintSchema = z.object({
  id: requiredText,
  reason: z.string().trim().optional(),
});

export const commentCreateSchema = z.object({
  menfessId: requiredText,
  content: requiredText,
  author: z.string().trim().optional(),
});

export const reactionSchema = z.object({
  menfessId: requiredText,
  type: requiredText,
  action: z.enum(["add", "remove"]).default("add"),
});

export type BanFingerprintInput = z.infer<typeof banFingerprintSchema>;
export type CommentCreateInput = z.infer<typeof commentCreateSchema>;
export type MenfessCreateInput = z.infer<typeof menfessCreateSchema>;
export type ReactionInput = z.infer<typeof reactionSchema>;
