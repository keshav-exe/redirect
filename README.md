# Universal Social Redirect App

Minimal, web-first universal social redirect app. Clean URLs like `/username/platform` that redirect instantly.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:

Create a `.env.local` file with:

```bash
# Supabase (from https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth.js
AUTH_SECRET="your-secret-here" # Generate with: openssl rand -base64 32
AUTH_URL="http://localhost:3000" # Your app URL

# OAuth Providers (get from their developer consoles)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**OAuth Setup:**
- **GitHub**: https://github.com/settings/developers → New OAuth App
- **Google**: https://console.cloud.google.com/apis/credentials → Create OAuth 2.0 Client

3. Run the dev server:
```bash
pnpm dev
```

## Usage

1. Sign in at `/auth/signin`
2. Create/edit your profile at `/edit`
3. Access redirects at `/[username]/[platform]` or `/[username]/x` (for Twitter)
4. Visit `/[username]` to see all platforms

## Features

- ✅ Authentication (GitHub & Google OAuth)
- ✅ Unique usernames (3-20 chars, alphanumeric + hyphens)
- ✅ Profile ownership (only you can edit your profile)
- ✅ Edit existing profiles
- ✅ Platform aliases (`x` → `twitter`)
- ✅ Fast redirects via Supabase

## Tech Stack

- Next.js 16 (App Router)
- NextAuth.js v5 (Auth.js)
- Supabase (PostgreSQL)
- TypeScript
- Tailwind CSS

## Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema from `supabase/schema.sql` in the SQL Editor
3. Get your project URL and service role key from Settings → API
4. Add to environment variables

## Deployment

1. Push to GitHub
2. Import to Vercel
3. Add Supabase environment variables in Vercel dashboard
4. Deploy
