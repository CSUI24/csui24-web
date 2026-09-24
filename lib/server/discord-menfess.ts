import {
  approveGuestMenfess,
  declineGuestMenfess,
  deleteMenfess,
} from "@/lib/server/menfess";
import {
  updateDiscordModerationMessage,
  type DiscordModerationOutcome,
} from "@/lib/server/discord";
import { banMenfessIdentity } from "@/lib/server/menfess-identity-ban";

export type DiscordMenfessAction = "approve" | "decline" | "delete" | "ban";

export async function handleDiscordMenfessAction(input: {
  action: DiscordMenfessAction;
  menfessId: string;
  channelId: string;
  messageId: string;
  originalEmbed?: Record<string, unknown>;
  moderatorName?: string;
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
  } else if (input.action === "delete") {
    await deleteMenfess(input.menfessId);
    outcome = "deleted";
    responseMessage = "Menfess and any linked public post deleted.";
  } else {
    const result = await banMenfessIdentity(input.menfessId);
    outcome =
      result.mode === "sso"
        ? "banned-sso"
        : result.approvalStatus === "PENDING"
          ? "banned-guest-pending"
          : "banned-guest-reviewed";
    responseMessage =
      result.mode === "sso"
        ? "UI SSO identity banned from future SSO menfess. This post was not deleted."
        : result.ipBanned
          ? "Guest fingerprint and IP banned from future guest menfess. This post was not deleted."
          : "Guest fingerprint banned. No IP was available for this post, so it was not added to the IP ban list. This post was not deleted.";
  }

  try {
    await updateDiscordModerationMessage({
      channelId: input.channelId,
      messageId: input.messageId,
      menfessId: input.menfessId,
      outcome,
      originalEmbed: input.originalEmbed,
      approvedBy: input.action === "approve" ? input.moderatorName : undefined,
      deletedBy: input.action === "delete" ? input.moderatorName : undefined,
    });
  } catch (error) {
    console.error("Failed to update Discord moderation message:", error);
  }

  return responseMessage;
}
