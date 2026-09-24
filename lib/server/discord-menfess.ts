import {
  approveGuestMenfess,
  declineGuestMenfess,
  deleteMenfess,
} from "@/lib/server/menfess";
import {
  updateDiscordModerationMessage,
  type DiscordModerationOutcome,
} from "@/lib/server/discord";

export type DiscordMenfessAction = "approve" | "decline" | "delete";

export async function handleDiscordMenfessAction(input: {
  action: DiscordMenfessAction;
  menfessId: string;
  channelId: string;
  messageId: string;
  originalEmbed?: Record<string, unknown>;
}) {
  let outcome: DiscordModerationOutcome;
  let responseMessage: string;

  if (input.action === "approve") {
    const result = await approveGuestMenfess(input.menfessId);
    outcome = result.published ? "approved" : "approved-unpublished";
    responseMessage = result.published
      ? "Guest menfess approved and published."
      : "Guest menfess approved, but publishing failed. Check the server logs before retrying.";
  } else if (input.action === "decline") {
    await declineGuestMenfess(input.menfessId);
    outcome = "declined";
    responseMessage = "Guest menfess declined.";
  } else {
    await deleteMenfess(input.menfessId);
    outcome = "deleted";
    responseMessage = "Menfess and any linked public post deleted.";
  }

  try {
    await updateDiscordModerationMessage({
      channelId: input.channelId,
      messageId: input.messageId,
      menfessId: input.menfessId,
      outcome,
      originalEmbed: input.originalEmbed,
    });
  } catch (error) {
    console.error("Failed to update Discord moderation message:", error);
  }

  return responseMessage;
}
