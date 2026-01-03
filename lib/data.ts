import type { Profile, Platform } from "./types";
import { kv } from "@vercel/kv";

const PROFILE_KEY_PREFIX = "profile:";

function getKey(username: string): string {
  return `${PROFILE_KEY_PREFIX}${username.toLowerCase()}`;
}

export async function getProfile(username: string): Promise<Profile | null> {
  const data = await kv.get<Profile>(getKey(username));
  return data || null;
}

export async function getProfileLink(
  username: string,
  platform: Platform
): Promise<string | null> {
  const profile = await getProfile(username);
  if (!profile) return null;

  const link = profile.links.find((l) => l.platform === platform);
  return link?.url || null;
}

export async function saveProfile(profile: Profile): Promise<void> {
  const key = getKey(profile.username);
  await kv.set(key, profile);
}

// Platform URL builders for universal/app links
export function buildPlatformUrl(platform: Platform, url: string): string {
  // Extract username/handle from URL
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  switch (platform) {
    case "twitter":
      // Try app link first, fallback to web
      return `https://twitter.com${pathname}`;
    case "instagram":
      return `https://instagram.com${pathname}`;
    case "linkedin":
      return `https://linkedin.com${pathname}`;
    case "github":
      return `https://github.com${pathname}`;
    case "youtube":
      return url; // YouTube URLs are already correct
    case "tiktok":
      return `https://tiktok.com${pathname}`;
    case "website":
      return url;
    default:
      return url;
  }
}
