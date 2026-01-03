import type { Profile, Platform } from "./types";
import { supabase } from "./supabase";

export async function getProfile(username: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .single();

  if (error || !data) return null;

  return {
    username: data.username,
    links: data.links as Profile["links"],
    userId: data.user_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

// Normalize platform name (x → twitter)
function normalizePlatform(platform: string): Platform {
  if (platform === "x") return "twitter";
  return platform as Platform;
}

export async function getProfileLink(
  username: string,
  platform: string
): Promise<string | null> {
  const normalizedPlatform = normalizePlatform(platform);
  const profile = await getProfile(username);
  if (!profile) return null;

  const link = profile.links.find((l) => l.platform === normalizedPlatform);
  return link?.url || null;
}

export async function usernameExists(username: string): Promise<boolean> {
  const existing = await getProfile(username);
  return existing !== null;
}

export async function saveProfile(profile: Profile): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        username: profile.username.toLowerCase(),
        user_id: profile.userId,
        links: profile.links,
        updated_at: new Date().toISOString(),
        ...(profile.createdAt && { created_at: profile.createdAt }),
      },
      {
        onConflict: "username",
      }
    );

  if (error) {
    throw new Error(`Failed to save profile: ${error.message}`);
  }
}

export async function getProfileByUserId(
  userId: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    username: data.username,
    links: data.links as Profile["links"],
    userId: data.user_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export async function canEditProfile(
  username: string,
  userId: string
): Promise<boolean> {
  const profile = await getProfile(username);
  return profile?.userId === userId;
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
