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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
