import type { Platform } from "./types";

// Single source of truth for platform display names, redirect domains,
// and favicon lookups. Insertion order drives the UI list order.
export const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: "Twitter / X",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
  tiktok: "TikTok",
  reddit: "Reddit",
  website: "Website",
};

export const PLATFORM_ORDER: Platform[] = [
  "twitter",
  "instagram",
  "linkedin",
  "github",
  "youtube",
  "tiktok",
  "reddit",
  "website",
];

export const PLATFORM_DOMAINS: Partial<Record<Platform, string>> = {
  twitter: "twitter.com",
  instagram: "instagram.com",
  linkedin: "linkedin.com",
  github: "github.com",
  tiktok: "tiktok.com",
  reddit: "reddit.com",
};

export function normalizePlatform(platform: string): Platform {
  return platform === "x" ? "twitter" : (platform as Platform);
}

export function getPlatformLabel(platform: string): string {
  const normalized = normalizePlatform(platform);
  return PLATFORM_LABELS[normalized] ?? platform;
}

// "website" links point anywhere, so its domain and favicon come from
// the stored URL instead of a fixed map entry.
export function getPlatformDomain(platform: Platform, url?: string): string {
  if (platform === "website" || platform === "youtube") {
    if (!url) return "";
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  }
  return PLATFORM_DOMAINS[platform] ?? "";
}

export function getFaviconUrl(
  platform: Platform,
  url?: string,
  size = 64
): string {
  const domain = getPlatformDomain(platform, url);
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}
