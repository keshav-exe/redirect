import { headers } from "next/headers";

// Link-preview crawlers used by chat apps and social platforms. Matching
// against this lets us skip the instant redirect for bots only, so they see
// a page with proper OG metadata instead of following the 307 straight to
// the destination (and stealing its OG card instead of ours).
const BOT_UA_REGEX =
  /bot|facebookexternalhit|twitterbot|slackbot|discordbot|telegrambot|whatsapp|linkedinbot|pinterest|redditbot|embedly|quora link preview|showyoubot|outbrain|iframely|vkshare|nuzzel|flipboard|tumblr|bitlybot|skypeuripreview|w3c_validator/i;

export async function isBotRequest(): Promise<boolean> {
  const headersList = await headers();
  const ua = headersList.get("user-agent") || "";
  return BOT_UA_REGEX.test(ua);
}
