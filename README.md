# Universal Social Redirect App

Minimal, web-first universal social redirect app. Clean URLs like `/username/platform` that redirect instantly.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up Vercel KV:
- Create a KV database in your Vercel project dashboard
- The `@vercel/kv` package automatically uses `KV_REST_API_URL` and `KV_REST_API_TOKEN` from your environment
- For local dev, create a `.env.local` file with your KV credentials (get them from Vercel dashboard)

3. Run the dev server:
```bash
pnpm dev
```

## Usage

1. Create a profile at `/edit`
2. Access redirects at `/[username]/[platform]`
3. Visit `/[username]` to see all platforms or auto-redirect if only one

## Tech Stack

- Next.js 16 (App Router)
- Edge Runtime for all routes (fastest possible)
- Vercel KV (Redis) for sub-millisecond reads
- TypeScript
- Tailwind CSS

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Create a KV database in Vercel dashboard
4. Environment variables are automatically set
5. Deploy

The app runs entirely on Edge Runtime for maximum speed.
