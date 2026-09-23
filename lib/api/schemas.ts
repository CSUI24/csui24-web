import { z } from "zod";

const requiredText = z.string().trim().min(1);
const optionalText = z.string().trim().optional();

export const menfessInputSchema = z.object({
  to: optionalText,
  from: optionalText,
  message: optionalText,
  fingerprint: optionalText,
});

export const menfessCreateSchema = z.object({
  to: requiredText,
  from: requiredText,
  message: requiredText,
  fingerprint: requiredText,
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
