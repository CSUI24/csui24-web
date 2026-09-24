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

Menfess submissions are sent to a Discord moderation channel when Discord is configured. Guest submissions have Approve, Decline, Delete, and Ban buttons. UI SSO submissions publish immediately and have Delete and Ban buttons. Ban blocks future SSO submissions from the same UI identity, or future guest submissions from the same fingerprint and IP address. IP addresses are stored as keyed hashes, not in plain text. Ban does not remove the current post; use Delete for that. Delete removes the database entry and any linked public post.

Configure these server-only environment variables:

- `DISCORD_APPLICATION_PUBLIC_KEY`: the public key from the Discord Developer Portal.
- `DISCORD_BOT_TOKEN`: the bot token. Keep this secret.
- `DISCORD_MODERATION_CHANNEL_ID`: the channel where moderation messages should appear.
- `DISCORD_MODERATOR_ROLE_IDS`: optional, comma-separated role IDs allowed to use the buttons. Leave it blank to allow any member who can access the moderation channel.
- `CLOUDFLARE_PROXY_SECRET`: a random shared value used to trust Cloudflare's visitor-IP header when the production domain is proxied through Cloudflare.

Add the bot to the server with permission to view the moderation channel, send messages, and embed links. In the Discord Developer Portal, set the production Interactions Endpoint URL to `https://cosmic.csui.dev/api/discord/interactions`. Local development needs a public HTTPS tunnel configured as that endpoint. The bot and endpoint variables must be configured before Discord notifications and actions become available. For guest IP bans behind Cloudflare, set `CLOUDFLARE_PROXY_SECRET` in Vercel and add a Cloudflare request header transform rule for `cosmic.csui.dev` that overwrites `x-cosmic-proxy-secret` with the same random value. The server only trusts `CF-Connecting-IP` when this marker matches; direct Vercel requests use Vercel's forwarded client IP.

## Menfess image uploads

Menfess accepts up to four JPEG, PNG, WebP, or GIF images, with a 1 MB limit per file. The browser uploads directly to R2 using a five-minute pre-signed `PUT` URL. R2 credentials stay on the server; the client receives only a URL scoped to one temporary object, one content type, and the declared file size. The server checks the stored object size and content type again before attaching it to a menfess. R2 pre-signed uploads use `PUT` because R2 does not support pre-signed form `POST` uploads.

Set these server-only environment variables:

- `R2_ACCOUNT_ID`: Cloudflare account ID.
- `R2_BUCKET_NAME`: bucket used for menfess images.
- `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`: R2 S3 API token credentials with object read/write access to this bucket.
- `R2_PUBLIC_URL`: public bucket custom domain, without a trailing slash (for example, `https://images.example.com`). Discord and the menfess feed need to fetch images from this URL without authentication.

Enable public reads through an R2 custom domain (or use `r2.dev` for development). Add this CORS policy under the bucket's **Settings → CORS Policy**, replacing the production origin with the actual site origin:

```json
[
  {
    "AllowedOrigins": ["https://cosmic.csui.dev", "http://localhost:3000"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Create an R2 lifecycle rule that expires objects with the `menfess/staging/` prefix after one day. These are unfinished uploads; submitted images are moved to `menfess/images/` and are retained until the menfess is declined or deleted.

Apply new database schema migrations with `pnpm prisma migrate deploy` before deploying code that depends on them. Keep `SSO_SESSION_SECRET` stable: it is also used as the secret key for SSO identity and guest IP ban hashes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
