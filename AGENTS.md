# AGENTS.md

Guide for AI coding agents working on the redirect repository.

## What this project is

redirect is a minimal link-per-platform service. Users claim a username and add social profile URLs. Public routes like `/keshav/twitter` redirect instantly to the stored destination. The hub page at `/keshav` lists all platforms.

Open source, MIT licensed, hosted at redirect.kshv.me.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Auth | NextAuth.js v5 (Google + GitHub OAuth, JWT sessions) |
| Database | Supabase (PostgreSQL), service role client server-side |
| Styling | Tailwind CSS v4, shadcn/ui components |
| Package manager | pnpm |

## Directory map

```
app/
  page.tsx                    Homepage (claim username)
  [username]/page.tsx         Profile hub (platform picker)
  [username]/[platform]/      Instant redirect + OG fallback for bots
  edit/page.tsx               Authenticated profile editor
  api/profile/route.ts        POST save / GET own profile
  api/auth/[...nextauth]/     NextAuth handlers
components/marketing/         Marketing shell, header, footer
components/ui/                Reusable UI (Button, InputGroup, etc.)
lib/
  data.ts                     Profile CRUD (Supabase)
  platforms.ts                Platform labels, domains, favicons
  urls.ts                     validateRedirectUrl (http/https only)
  rate-limit.ts               In-memory rate limiter
  ads.ts                      ADS_ENABLED flag + sponsor config
  site.ts                     SITE_URL, GITHUB_REPO_URL
  seo.ts                      Metadata helpers
  errors.ts                   Auth error codes
middleware.ts                 Rate limits profile + API routes
supabase/schema.sql           Database schema + RLS
auth.ts                       NextAuth config
```

## Conventions

### Code style

- TypeScript strict mode
- Prefer existing patterns over new abstractions
- Minimal diff scope — don't refactor unrelated code
- Comments only for non-obvious business logic
- Use `@/` path alias for imports

### UI

- Inter for body/headings, Zen Dots (`font-display`) for logo only
- Brand color: sky-600 (`#0284c7`)
- Buttons use `cursor-pointer`, `ease-out` transitions ~200ms
- Marketing pages use `MarketingShell` wrapper
- No icon→title→body marketing grids on feature pages — use prose `<dl>` layout

### Routing

- Reserved path segments in middleware: `features`, `advertise`, `privacy`, `terms`, `edit`, `auth`, `api`
- Profile routes are `/:username` and `/:username/:platform`
- Platform alias: `x` → `twitter` (via `normalizePlatform`)

### Data model

```ts
interface Profile {
  username: string;       // 3-20 chars, lowercase alphanumeric + hyphens
  links: ProfileLink[];   // { platform, url }[], no duplicate platforms
  userId: string;         // OAuth sub, never exposed in public API
  adFree?: boolean;       // hides sponsor slot when ADS_ENABLED
}
```

### Auth flow

1. User signs in via Google/GitHub at `/auth/signin`
2. Session stored as JWT (30-day max age)
3. `/edit` fetches `GET /api/profile` (own profile only)
4. Save via `POST /api/profile` with ownership checks

### Security rules (do not weaken)

- `GET /api/profile` returns only the authenticated user's profile — no `?username=` lookup
- Never expose `userId` in public API responses; use `toOwnerProfile()`
- Validate all redirect URLs with `validateRedirectUrl()` before save
- Supabase uses service role server-side; RLS denies anon/authenticated direct access
- Rate limits in middleware for profile pages and `/api/profile`

## Environment variables

See `.env.example`. Required for local dev:

- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `AUTH_SECRET`, `AUTH_URL`, `NEXT_PUBLIC_SITE_URL`
- At least one OAuth provider (Google and/or GitHub)

Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to the client.

## Common tasks

### Add a new platform

1. Add to `Platform` type in `lib/types.ts`
2. Add label, domain, favicon logic in `lib/platforms.ts`
3. Add to platform list in `app/edit/page.tsx` (`PLATFORMS` constant)

### Enable ads/sponsors

Set `ADS_ENABLED = true` in `lib/ads.ts`. This re-enables:
- `/advertise` page
- Nav/footer advertise links
- `AdSlot` on profile hub pages
- Ad-free toggle in `/edit`

Set `CURRENT_SPONSOR` in `lib/ads.ts` when a sponsor is booked.

### Run locally

```bash
pnpm install
cp .env.example .env.local
# Fill in env vars, run supabase/schema.sql
pnpm dev
```

### Verify changes

```bash
pnpm lint
pnpm build
```

## Feature flags

| Flag | Location | Default |
|------|----------|---------|
| `ADS_ENABLED` | `lib/ads.ts` | `false` |

## Bot handling

`lib/bot-detect.ts` identifies crawlers. On `/[username]/[platform]`:
- Humans → instant `redirect()` to destination
- Bots → static fallback page with OG-friendly content

## What not to do

- Don't add click analytics or visitor tracking
- Don't expose service role key or add client-side Supabase writes
- Don't add `?username=` to profile GET API (IDOR risk)
- Don't allow non-http(s) URL schemes in saved links
- Don't enumerate all profiles in sitemap (removed for privacy)
- Don't use serif fonts globally — Zen Dots is logo-only
- Don't create commits unless explicitly asked

## Deployment

Vercel with env vars from `.env.example`. Set production `AUTH_URL` and `NEXT_PUBLIC_SITE_URL` to the live domain. Update OAuth callback URLs accordingly.

Run `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;` on existing databases if upgrading from pre-RLS schema.
