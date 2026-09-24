import { after } from "next/server";
import {
  getDiscordConfig,
  verifyDiscordRequestSignature,
  updateDiscordInteractionResponse,
} from "@/lib/server/discord";
import {
  handleDiscordMenfessAction,
  type DiscordMenfessAction,
} from "@/lib/server/discord-menfess";
import { isApiError } from "@/lib/api/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DiscordInteraction = {
  type?: number;
  application_id?: string;
  token?: string;
  channel_id?: string;
  member?: {
    roles?: string[];
    nick?: string;
    user?: { username?: string; global_name?: string };
  };
  user?: { username?: string; global_name?: string };
  data?: { custom_id?: string };
  message?: {
    id?: string;
    embeds?: Array<Record<string, unknown>>;
  };
};

function ephemeralMessage(content: string) {
  return Response.json({
    type: 4,
    data: { content, flags: 64 },
  });
}

function getModeratorName(interaction: DiscordInteraction) {
  const member = interaction.member;
  const user = member?.user ?? interaction.user;

  return (
    member?.nick?.trim() ||
    user?.global_name?.trim() ||
    user?.username?.trim() ||
    "Unknown moderator"
  );
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const validSignature = verifyDiscordRequestSignature(
    request.headers.get("x-signature-ed25519"),
    request.headers.get("x-signature-timestamp"),
    rawBody,
  );

  if (!validSignature) {
    return new Response("Invalid Discord request signature", { status: 401 });
  }

  let interaction: DiscordInteraction;
  try {
    interaction = JSON.parse(rawBody) as DiscordInteraction;
  } catch {
    return new Response("Invalid interaction payload", { status: 400 });
  }

  if (interaction.type === 1) {
    return Response.json({ type: 1 });
  }

  if (interaction.type !== 3) {
    return ephemeralMessage("Unsupported Discord interaction.");
  }

  const config = getDiscordConfig();
  if (!config) {
    return ephemeralMessage("Discord moderation is not fully configured.");
  }

  const customId = interaction.data?.custom_id;
  const actionMatch = customId?.match(
    /^menfess:(approve|decline|delete|ban):([a-zA-Z0-9_-]{1,64})$/,
  );
  if (!actionMatch) {
    return ephemeralMessage("Unknown menfess moderation action.");
  }

  const channelId = interaction.channel_id;
  const messageId = interaction.message?.id;
  const memberRoles = interaction.member?.roles;
  const isAuthorizedMember =
    memberRoles !== undefined &&
    (config.moderatorRoleIds.length === 0 ||
      memberRoles.some((roleId) => config.moderatorRoleIds.includes(roleId)));

  if (channelId !== config.channelId || !messageId || !isAuthorizedMember) {
    return ephemeralMessage("You are not authorized to moderate this menfess.");
  }

  const applicationId = interaction.application_id;
  const interactionToken = interaction.token;
  if (!applicationId || !interactionToken) {
    return ephemeralMessage("Discord interaction is missing its response token.");
  }

  const action = actionMatch[1] as DiscordMenfessAction;
  const menfessId = actionMatch[2];
  const originalEmbed = interaction.message?.embeds?.[0];
  const moderatorName = getModeratorName(interaction);

  after(async () => {
    let responseMessage: string;

    try {
      responseMessage = await handleDiscordMenfessAction({
        action,
        menfessId,
        channelId,
        messageId,
        originalEmbed,
        moderatorName,
      });
    } catch (error) {
      responseMessage = isApiError(error)
        ? error.message
        : "Could not complete this menfess action. Check the server logs.";
      if (!isApiError(error)) {
        console.error("Discord menfess action failed:", error);
      }
    }

    try {
      await updateDiscordInteractionResponse({
        applicationId,
        interactionToken,
        content: responseMessage,
      });
    } catch (error) {
      console.error("Failed to update Discord interaction response:", error);
    }
  });

  return Response.json({
    type: 5,
    data: { content: "Processing menfess action…", flags: 64 },
  });
}

export function GET() {
  return new Response("Method not allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
