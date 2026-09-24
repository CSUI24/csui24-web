import { createPublicKey, verify } from "node:crypto";
import { briefFamsData } from "@/modules/fams-data";

const DISCORD_API = "https://discord.com/api/v10";
const ED25519_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");

export type MenfessDiscordNotice = {
  id: string;
  from: string;
  to: string;
  message: string;
  mode: "guest" | "sso";
  published: boolean;
};

type DiscordConfig = {
  applicationPublicKey: string;
  botToken: string;
  channelId: string;
  moderatorRoleIds: string[];
};

export function getDiscordConfig(): DiscordConfig | null {
  const applicationPublicKey = process.env.DISCORD_APPLICATION_PUBLIC_KEY;
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_MODERATION_CHANNEL_ID;
  const moderatorRoleIds = (process.env.DISCORD_MODERATOR_ROLE_IDS ?? "")
    .split(",")
    .map((roleId) => roleId.trim())
    .filter(Boolean);

  if (
    !applicationPublicKey ||
    !/^[\da-f]{64}$/i.test(applicationPublicKey) ||
    !botToken ||
    !channelId
  ) {
    return null;
  }

  return {
    applicationPublicKey,
    botToken,
    channelId,
    moderatorRoleIds,
  };
}

export function verifyDiscordRequestSignature(
  signature: string | null,
  timestamp: string | null,
  body: string,
) {
  const publicKeyHex = process.env.DISCORD_APPLICATION_PUBLIC_KEY;

  if (
    !publicKeyHex ||
    !/^[\da-f]{128}$/i.test(publicKeyHex) ||
    !signature ||
    !/^[\da-f]{128}$/i.test(signature) ||
    !timestamp ||
    !/^\d{10,13}$/.test(timestamp)
  ) {
    return false;
  }

  const timestampMilliseconds =
    timestamp.length === 13 ? Number(timestamp) : Number(timestamp) * 1000;
  if (Math.abs(Date.now() - timestampMilliseconds) > 5 * 60 * 1000) {
    return false;
  }

  try {
    const publicKey = createPublicKey({
      key: Buffer.concat([
        ED25519_SPKI_PREFIX,
        Buffer.from(publicKeyHex, "hex"),
      ]),
      format: "der",
      type: "spki",
    });

    return verify(
      null,
      Buffer.from(`${timestamp}${body}`),
      publicKey,
      Buffer.from(signature, "hex"),
    );
  } catch {
    return false;
  }
}

function formatName(value: string) {
  const famName = briefFamsData.find(
    (fam) => fam.id === value.replace("fams/", ""),
  )?.["full-name"];

  return famName ? `${famName} CSUI24` : value;
}

function escapeDiscordMarkdown(value: string) {
  return value.replace(/[\\*_~`|>]/g, "\\$&").replace(/\u0000/g, "");
}

function getModerationEmbed(input: MenfessDiscordNotice) {
  const isGuest = input.mode === "guest";
  const title = isGuest
    ? "Guest menfess · Pending review"
    : input.published
      ? "UI SSO menfess · Published"
      : "UI SSO menfess · Not published";

  return {
    title,
    color: isGuest ? 0xf0ad4e : input.published ? 0x5865f2 : 0x747f8d,
    fields: [
      { name: "From", value: escapeDiscordMarkdown(formatName(input.from)) },
      { name: "To", value: escapeDiscordMarkdown(formatName(input.to)) },
      { name: "Message", value: escapeDiscordMarkdown(input.message) },
    ],
    footer: { text: `Menfess ID: ${input.id}` },
    timestamp: new Date().toISOString(),
  };
}

function getModerationComponents(input: MenfessDiscordNotice) {
  const buttons =
    input.mode === "guest"
      ? [
          { action: "approve", label: "Approve", style: 3 },
          { action: "decline", label: "Decline", style: 4 },
          { action: "delete", label: "Delete", style: 4 },
        ]
      : [{ action: "delete", label: "Delete", style: 4 }];

  return [
    {
      type: 1,
      components: buttons.map((button) => ({
        type: 2,
        style: button.style,
        label: button.label,
        custom_id: `menfess:${button.action}:${input.id}`,
      })),
    },
  ];
}

async function discordBotRequest(path: string, init: RequestInit) {
  const config = getDiscordConfig();
  if (!config) {
    throw new Error("Discord menfess moderation is not configured");
  }

  const response = await fetch(`${DISCORD_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bot ${config.botToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Discord API request failed (${response.status}): ${await response.text()}`,
    );
  }

  return response;
}

export async function sendMenfessToDiscord(input: MenfessDiscordNotice) {
  const config = getDiscordConfig();
  if (!config) {
    console.warn(
      "Discord menfess moderation is disabled; configure the Discord environment variables to enable it.",
    );
    return;
  }

  await discordBotRequest(`/channels/${config.channelId}/messages`, {
    method: "POST",
    body: JSON.stringify({
      embeds: [getModerationEmbed(input)],
      components: getModerationComponents(input),
      allowed_mentions: { parse: [] },
    }),
  });
}

export type DiscordModerationOutcome =
  | "approved"
  | "approved-unpublished"
  | "declined"
  | "deleted";

export async function updateDiscordModerationMessage(input: {
  channelId: string;
  messageId: string;
  menfessId: string;
  outcome: DiscordModerationOutcome;
  originalEmbed?: Record<string, unknown>;
}) {
  const embed =
    input.outcome === "deleted"
      ? {
          title: "Menfess deleted",
          description: "The menfess and any linked public post were deleted.",
          color: 0xed4245,
          footer: { text: `Menfess ID: ${input.menfessId}` },
          timestamp: new Date().toISOString(),
        }
      : {
          ...input.originalEmbed,
          title:
            input.outcome === "declined"
              ? "Guest menfess · Declined"
              : input.outcome === "approved-unpublished"
                ? "Guest menfess · Approved, not published"
                : "Guest menfess · Approved",
          color:
            input.outcome === "declined"
              ? 0x747f8d
              : input.outcome === "approved-unpublished"
                ? 0xf0ad4e
                : 0x57f287,
        };

  await discordBotRequest(
    `/channels/${input.channelId}/messages/${input.messageId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        embeds: [embed],
        components:
          input.outcome === "deleted"
            ? []
            : [
                {
                  type: 1,
                  components: [
                    {
                      type: 2,
                      style: 4,
                      label: "Delete",
                      custom_id: `menfess:delete:${input.menfessId}`,
                    },
                  ],
                },
              ],
      }),
    },
  );
}

export async function updateDiscordInteractionResponse(input: {
  applicationId: string;
  interactionToken: string;
  content: string;
}) {
  const response = await fetch(
    `${DISCORD_API}/webhooks/${input.applicationId}/${input.interactionToken}/messages/@original`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input.content }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Discord interaction response update failed (${response.status}): ${await response.text()}`,
    );
  }
}
