# Discord menfess moderation setup

The app sends each accepted guest and UI SSO menfess to one Discord moderation channel.

- Guest menfess: **Approve**, **Decline**, and **Delete** actions.
- UI SSO menfess: published immediately, with a **Delete** action only.
- Delete removes the menfess, its comments and reactions, and its linked public tweet if one exists.
- SSO account details are not included in the Discord message.

## Discord application setup

1. Create an application in the Discord Developer Portal and add a bot user.
2. Copy the application's **Public Key** and the bot's **Token** into server-only environment variables:
   - `DISCORD_APPLICATION_PUBLIC_KEY`
   - `DISCORD_BOT_TOKEN`
3. Invite the bot to the server and grant it permission to view the moderation channel, send messages, and embed links.
4. Enable Developer Mode in Discord, then copy the moderation channel ID and moderator role IDs into:
   - `DISCORD_MODERATION_CHANNEL_ID`
   - `DISCORD_MODERATOR_ROLE_IDS` (comma-separated when there are multiple roles; leave blank to allow all members who can access the moderation channel)
5. Set the production application's **Interactions Endpoint URL** to `https://cosmic.csui.dev/api/discord/interactions`. Discord verifies the endpoint with a signed ping request.
6. Deploy the app with those variables set. For local development, expose the local HTTPS endpoint through a public HTTPS tunnel and use that URL in the Developer Portal.

The interaction endpoint verifies Discord's Ed25519 signatures and only accepts button actions from the configured channel. If moderator role IDs are set, it also requires one of those roles; if the list is blank, any member who can access the channel may use the buttons. Without the application public key, bot token, or channel ID, submissions continue to be stored and SSO posts continue through their existing flow, but Discord notifications and moderation actions are unavailable.
