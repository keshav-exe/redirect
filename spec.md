# Project: Universal Social Redirect App

## Product Summary

Build a **minimal, ultra-clean web app** that provides universal social profile redirects.

Example:

- https://domain.com/keshav/twitter → redirects to Twitter profile
- https://domain.com/keshav/instagram → redirects to Instagram profile
- https://domain.com/keshav → optional smart redirect (platform/context-based)

The product should feel **invisible, fast, and obvious**.
No dashboards from hell. No creator-economy bloat.

Design inspiration: https://pop.site/  
Keywords: calm, neutral, whitespace-heavy, premium but not loud.

---

## Core Principles

- Web-first (no mobile app)
- Redirect speed > everything
- Zero cognitive load
- One job, done perfectly
- “It just works” energy

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Edge Middleware for redirects
- Supabase (or lightweight DB)
- No auth required for public viewing
- Optional auth only for editing profile

---

## Routes & Behavior

### Public Redirect Routes

- `/[username]/[platform]`

  - Example: `/keshav/twitter`
  - Looks up platform URL from DB
  - Redirects immediately (302 or 307)

- `/[username]`
  - If only one platform exists → redirect directly
  - If multiple exist → ultra-minimal selection page
  - Optional future: smart context-based redirect

---

### Profile Setup (MVP)

- `/edit`
- Minimal form:
  - Username
  - Platform dropdown (twitter, instagram, github, linkedin, etc.)
  - Profile URL
- Save → done

No analytics. No themes. No widgets.

---

## Supported Platforms (Initial)

- Twitter / X
- Instagram
- LinkedIn
- GitHub
- YouTube
- TikTok
- Website (generic)

Keep platform list hardcoded initially.

---

## Redirect Logic

- Use Edge Middleware for fastest redirects
- Detect:
  - iOS / Android
  - Installed app (via universal/app links)
- Fallback to web profile if app deep link fails

Failure state = still works. No dead ends.

---

## Design System

### Visual Style

- Background: off-white / very light gray
- Text: near-black, not pure black
- No gradients
- No shadows unless extremely subtle
- Rounded corners, but restrained
- System font or clean grotesk (Inter / SF-like)

### UI Philosophy

- Fewer components > prettier components
- Everything centered
- Max-width layouts
- Generous whitespace
- Nothing flashy
- No emojis
- No illustrations
- No icons unless absolutely necessary

---

## Pages

### Landing Page

- One sentence headline
- One example link
- One CTA: “Create yours”
- Footer with nothing unnecessary

### Profile Selector Page (only if needed)

- Vertical list of platforms
- Plain text buttons
- No logos unless super muted
- Clicking redirects immediately

---

## Non-Goals (Do NOT build)

- Link-in-bio pages
- Analytics dashboards
- Custom themes
- Social embeds
- Monetization in v1
- Creator tools
- Notifications
- Mobile app

---

## Success Criteria

- Redirect happens in <200ms
- UX feels boring (good sign)
- Explains itself without onboarding
- Works perfectly when shared anywhere

---

## Tone

- Calm
- Confident
- Neutral
- Almost invisible

If it feels “designed”, it’s too much.
