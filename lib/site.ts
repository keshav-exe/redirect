export const SITE_NAME = "redirect";
export const SITE_DESCRIPTION =
  "Create clean, direct links to every social profile. One URL per platform, instant redirects, and no link-in-bio page in the way.";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.AUTH_URL ||
  "https://redirect.kshv.me"
).replace(/\/$/, "");

export const GITHUB_REPO_URL = "https://github.com/keshav-exe/redirect";
export const GITHUB_ISSUES_URL = `${GITHUB_REPO_URL}/issues`;

export const BRAND_COLOR = "#0284c7";
export const THEME_COLOR = "#181815";
