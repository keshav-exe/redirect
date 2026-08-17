# redirect

One URL per social platform. `/you/twitter` goes to Twitter, `/you/github` goes to GitHub. No link-in-bio page in the way.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/keshav-exe/redirect?style=social)](https://github.com/keshav-exe/redirect)

## Why

If you use different usernames on different apps, remembering which handle goes where gets old fast. redirect gives you one namespace (`/yourname`) and per-platform links underneath it.

## Features

- **One link per platform** — `/username/twitter`, `/username/instagram`, etc.
- **Instant redirects** — humans go straight to the destination
- **Rich link previews** — share cards show username + platform for crawlers
- **Real favicons** — pulled from the actual platforms
- **No click analytics** — we don't track redirect clicks
- **OAuth sign-in** — Google and GitHub via NextAuth.js

## Quick start

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) (recommended) or npm
- A [Supabase](https://supabase.com) project
- OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and/or [GitHub Developer Settings](https://github.com/settings/developers)

### 1. Clone and install

```bash
git clone https://github.com/keshav-exe/redirect.git
cd redirect
pnpm install
```

### 2. Environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only, never expose to client) |
| `AUTH_SECRET` | Random secret for NextAuth — generate with `openssl rand -base64 32` |
| `AUTH_URL` | Your app URL, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_URL` | Public canonical URL for SEO/sitemap (same as `AUTH_URL` in dev) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials (optional if only using Google) |

### 3. Database setup

Run the schema in your Supabase SQL Editor:

```bash
# Or paste supabase/schema.sql directly in the Supabase dashboard → SQL Editor
cat supabase/schema.sql
```

This creates the `profiles` table, indexes, triggers, and enables row-level security.

### 4. OAuth callback URLs

Configure these redirect URIs in your OAuth provider consoles:

| Provider | Callback URL |
|----------|--------------|
| Google | `{AUTH_URL}/api/auth/callback/google` |
| GitHub | `{AUTH_URL}/api/auth/callback/github` |

For local dev, that's `http://localhost:3000/api/auth/callback/google`.

### 5. Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), sign in, and claim a username at `/edit`.

## Usage

1. Sign in at `/auth/signin`
2. Create or edit your profile at `/edit`
3. Share links like `/{username}/twitter` or `/{username}/github`
4. Visit `/{username}` to see all platforms on one page

Platform aliases work too — `/username/x` redirects the same as `/username/twitter`.

## Project structure

```
app/
  [username]/           # Public profile + platform redirects
  api/profile/          # Authenticated profile CRUD
  api/auth/             # NextAuth handlers
  edit/                 # Profile editor (authenticated)
  auth/signin/          # Sign-in page
components/
  marketing/            # Shell, header, footer
  ui/                   # Shared UI primitives
lib/
  data.ts               # Supabase profile queries
  platforms.ts          # Platform config + URL builders
  urls.ts               # Redirect URL validation
  rate-limit.ts         # In-memory rate limiting
  site.ts               # Site URL + GitHub constants
supabase/
  schema.sql            # Database schema
```

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Set `AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your production domain
5. Update OAuth callback URLs to match production
6. Deploy

### Self-hosting

Any Node.js host that supports Next.js 16 works. Set `NODE_ENV=production`, run `pnpm build && pnpm start`, and ensure all env vars are configured.

## Security

- Profile API requires authentication; users can only read/edit their own profile
- Redirect URLs are validated (http/https only, credentials stripped)
- Rate limiting on profile lookups and API routes
- Supabase RLS enabled (service role used server-side)
- See [AGENTS.md](./AGENTS.md) for implementation details

## Contributing

Issues and PRs welcome at [github.com/keshav-exe/redirect](https://github.com/keshav-exe/redirect).

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm build`
5. Open a pull request

## License

[MIT](./LICENSE) — use it, fork it, self-host it.
