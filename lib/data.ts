import { cache } from "react";
import type { Profile, Platform } from "./types";
import { supabase } from "./supabase";
import { PLATFORM_DOMAINS, normalizePlatform } from "./platforms";

export const getProfile = cache(async function getProfile(
  username: string
): Promise<Profile | null> {
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
    adFree: data.ad_free ?? false,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
});

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = {
    username: profile.username.toLowerCase(),
    user_id: profile.userId,
    links: profile.links,
    ad_free: profile.adFree ?? false,
  };

  // Only set created_at if it's a new profile (createdAt is provided)
  // For updates, let the database preserve the existing created_at
  // Don't set updated_at - the database trigger handles it
  if (profile.createdAt) {
    payload.created_at = profile.createdAt;
  }

  // Retry logic for transient database errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastError: any = null;
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const { error, data } = await supabase
      .from("profiles")
      .upsert(payload, {
        onConflict: "username",
      });

    if (!error) {
      return; // Success
    }

    lastError = error;
    
    // If it's a schema cache error, wait and retry
    if (error.message?.includes("schema cache") || error.message?.includes("Retrying")) {
      if (attempt < maxRetries) {
        // Exponential backoff: 500ms, 1s, 2s
        await new Promise(resolve => setTimeout(resolve, 500 * Math.pow(2, attempt - 1)));
        continue;
      }
    }
    
    // For other errors or final retry, break and throw
    break;
  }

  console.error("Supabase error:", lastError);
  
  // Check if error message is HTML (database down)
  if (lastError?.message?.includes("<!DOCTYPE html>")) {
    throw new Error("Database server is temporarily unavailable. Please try again in a few minutes.");
  }
  
  // Check for schema cache errors
  if (lastError?.message?.includes("schema cache")) {
    throw new Error("Database connection issue. Please try again in a moment.");
  }
  
  throw new Error(`Failed to save profile: ${lastError?.message || "Unknown error"}`);
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
    adFree: data.ad_free ?? false,
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
  const domain = PLATFORM_DOMAINS[platform];
  if (!domain) return url;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return url;
    }
    const { pathname, search } = parsed;
    return `https://${domain}${pathname}${search}`;
  } catch {
    return url;
  }
}
