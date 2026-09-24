This is a [Next.js](https://nextjs.org) App Router project for the CSUI24 community site.

## Prerequisites


- Node.js 20.9 or newer
- pnpm 9.15 or newer

Install dependencies with:

```bash
pnpm install
```

## Getting Started

First, run the development server:


```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

The project uses the App Router for pages and colocated Route Handlers under `app/api`. Prisma Client is generated during builds.

## API structure

- `app/api/**/route.ts` contains only HTTP concerns: parsing requests, status codes, and response formatting.
- `lib/api/` contains shared schemas, authentication, and API errors.
- `lib/server/` contains server-side business logic and Prisma queries.

Keep database queries and business rules out of route handlers so they remain easy to test and maintain.

## Discord menfess moderation

Menfess submissions are sent to a Discord moderation channel when Discord is configured. Guest submissions have Approve, Decline, and Delete buttons. After Approve or Decline, Delete remains available. Approving publishes the menfess; declining keeps it hidden. UI SSO submissions publish immediately and only have a Delete button. Delete removes the database entry and any linked public post.

Configure these server-only environment variables:

- `DISCORD_APPLICATION_PUBLIC_KEY`: the public key from the Discord Developer Portal.
- `DISCORD_BOT_TOKEN`: the bot token. Keep this secret.
- `DISCORD_MODERATION_CHANNEL_ID`: the channel where moderation messages should appear.
- `DISCORD_MODERATOR_ROLE_IDS`: optional, comma-separated role IDs allowed to use the buttons. Leave it blank to allow any member who can access the moderation channel.

Add the bot to the server with permission to view the moderation channel, send messages, and embed links. In the Discord Developer Portal, set the production Interactions Endpoint URL to `https://cosmic.csui.dev/api/discord/interactions`. Local development needs a public HTTPS tunnel configured as that endpoint. The bot and endpoint variables must be configured before Discord notifications and actions become available.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
