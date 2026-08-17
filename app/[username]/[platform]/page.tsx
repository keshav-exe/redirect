import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getProfile, getProfileLink, buildPlatformUrl } from "@/lib/data";
import { getPlatformLabel, getFaviconUrl, normalizePlatform } from "@/lib/platforms";
import { isBotRequest } from "@/lib/bot-detect";
import { BackLink } from "@/components/ui/back-link";
import { Icon } from "@/components/ui/icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string; platform: string }>;
}): Promise<Metadata> {
  const { username, platform } = await params;
  const normalizedPlatform = normalizePlatform(platform);
  const label = getPlatformLabel(normalizedPlatform);
  const path =
    `/${encodeURIComponent(username)}/${encodeURIComponent(normalizedPlatform)}` as const;

  return {
    ...createPageMetadata({
      title: `@${username} on ${label}`,
      description: `Go directly to @${username}'s ${label} profile.`,
      path,
    }),
    alternates: {
      canonical: `${SITE_URL}/${encodeURIComponent(username)}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ username: string; platform: string }>;
}) {
  const { username, platform } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  const url = await getProfileLink(username, platform);

  if (url) {
    const normalizedPlatform = normalizePlatform(platform);
    const redirectUrl = buildPlatformUrl(normalizedPlatform, url);

    // Real visitors get an instant redirect. Speed is the whole point.
    // Link-preview crawlers get this page instead, so the share card shows
    // "@user → Twitter" rather than following the redirect and stealing
    // the destination's own OG card.
    if (!(await isBotRequest())) {
      redirect(redirectUrl);
    }

    const favicon = getFaviconUrl(normalizedPlatform, url);
    const label = getPlatformLabel(normalizedPlatform);

    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-5 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          {favicon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={favicon} alt="" width={40} height={40} className="rounded-[4px]" />
          )}
          <p className="flex items-center justify-center gap-2 text-base text-muted-foreground">
            @{username}
            <Icon icon={ArrowRight01Icon} className="size-4" />
            <span className="text-foreground">{label}</span>
          </p>
          <a
            href={redirectUrl}
            className="text-sm text-link underline underline-offset-4"
          >
            Continue to {label}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-5 lg:px-10">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <BackLink href={`/${username}`} />
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3rem]">
              Link <span className="text-foreground">not found</span>
            </h1>
            <p className="text-base text-muted-foreground">
              @{username} doesn&apos;t have a {platform} link.
            </p>
          </div>
          <Link
            href={`/${username}`}
            className="inline-flex rounded-sm bg-primary px-5 py-3 text-[15px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            View all links
          </Link>
        </div>
      </div>
    </main>
  );
}
