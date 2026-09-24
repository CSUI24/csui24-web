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
  ssoName?: string | null;
  imageUrls: string[];
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
  const publicKeyHex = process.env.DISCORD_APPLICATION_PUBLIC_KEY?.trim();

  if (
    !publicKeyHex ||
    !/^[\da-f]{64}$/i.test(publicKeyHex) ||
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
      ...(input.mode === "sso" && input.ssoName
        ? [
            {
              name: "UI SSO",
              value: escapeDiscordMarkdown(input.ssoName),
              inline: true,
            },
          ]
        : []),
      ...(input.imageUrls.length > 0
        ? [{ name: "Images", value: String(input.imageUrls.length), inline: true }]
        : []),
      { name: "Message", value: escapeDiscordMarkdown(input.message) },
    ],
    footer: { text: `Menfess ID: ${input.id}` },
    timestamp: new Date().toISOString(),
  };
}

function getModerationComponents(input: MenfessDiscordNotice) {
  const button = (action: string, label: string, style: number) => ({
    type: 2,
    style,
    label,
    custom_id: `menfess:${action}:${input.id}`,
  });
  const row = (components: ReturnType<typeof button>[]) => ({
    type: 1,
    components,
  });
  const deleteButton = button("delete", "Delete", 4);
  const banButton = button("ban", "Ban", 4);

  if (input.mode === "sso") {
    return [row([deleteButton, banButton])];
  }

  return [
    row([button("approve", "Approve", 3), button("decline", "Decline", 4)]),
    row([deleteButton, banButton]),
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
      embeds: [
        getModerationEmbed(input),
        ...input.imageUrls.slice(0, 4).map((url) => ({ image: { url } })),
      ],
      components: getModerationComponents(input),
      allowed_mentions: { parse: [] },
    }),
  });
}

export type DiscordModerationOutcome =
  | "approved"
  | "approved-unpublished"
  | "declined"
  | "deleted"
  | "banned-guest-pending"
  | "banned-guest-reviewed"
  | "banned-sso";

function getUpdatedModerationComponents(
  outcome: DiscordModerationOutcome,
  menfessId: string,
) {
  const button = (action: string, label: string, style: number) => ({
    type: 2,
    style,
    label,
    custom_id: `menfess:${action}:${menfessId}`,
  });
  const row = (components: ReturnType<typeof button>[]) => ({
    type: 1,
    components,
  });
  const deleteButton = button("delete", "Delete", 4);

  if (outcome === "deleted") {
    return [];
  }

  if (
    outcome === "approved" ||
    outcome === "approved-unpublished" ||
    outcome === "declined"
  ) {
    return [row([deleteButton, button("ban", "Ban", 4)])];
  }

  if (outcome === "banned-guest-pending") {
    return [
      row([button("approve", "Approve", 3), button("decline", "Decline", 4)]),
      row([deleteButton]),
    ];
  }

  return [row([deleteButton])];
}

export async function updateDiscordModerationMessage(input: {
  channelId: string;
  messageId: string;
  menfessId: string;
  outcome: DiscordModerationOutcome;
  originalEmbeds?: Record<string, unknown>[];
  approvedBy?: string;
  deletedBy?: string;
}) {
  const originalEmbed = input.originalEmbeds?.[0];
  let embed: Record<string, unknown>;

  if (input.outcome === "deleted") {
    embed = {
      title: "Menfess deleted",
      description: "The menfess and any linked public post were deleted.",
      color: 0xed4245,
      fields: [
        {
          name: "Deleted by",
          value: escapeDiscordMarkdown(input.deletedBy || "Unknown moderator"),
        },
      ],
      footer: { text: `Menfess ID: ${input.menfessId}` },
      timestamp: new Date().toISOString(),
    };
  } else if (input.outcome === "banned-sso") {
    embed = {
      ...originalEmbed,
      title: "UI SSO menfess · Identity banned",
      color: 0xed4245,
    };
  } else if (
    input.outcome === "banned-guest-pending" ||
    input.outcome === "banned-guest-reviewed"
  ) {
    embed = {
      ...originalEmbed,
      title: "Guest menfess · Sender banned",
      color: 0xed4245,
    };
  } else {
    const originalFields = Array.isArray(originalEmbed?.fields)
      ? originalEmbed.fields
      : [];
    const approvedByField =
      (input.outcome === "approved" ||
        input.outcome === "approved-unpublished") &&
      input.approvedBy
        ? [
            {
              name: "Approved by",
              value: escapeDiscordMarkdown(input.approvedBy),
              inline: true,
            },
          ]
        : [];

    embed = {
      ...originalEmbed,
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
      fields: [...originalFields, ...approvedByField],
    };
  }

  const originalImageEmbeds =
    input.outcome === "deleted" || input.outcome === "declined"
      ? []
      : (input.originalEmbeds?.slice(1) ?? []).filter(
          (item) => item.image && typeof item.image === "object",
        );

  await discordBotRequest(
    `/channels/${input.channelId}/messages/${input.messageId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        embeds: [embed, ...originalImageEmbeds],
        components: getUpdatedModerationComponents(
          input.outcome,
          input.menfessId,
        ),
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
