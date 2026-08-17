import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfile } from "@/lib/data";
import { PLATFORM_LABELS, getFaviconUrl } from "@/lib/platforms";
// import { AdSlot } from "@/components/ui/ad-slot";
import { BackLink } from "@/components/ui/back-link";
import { Icon } from "@/components/ui/icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const runtime = "nodejs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfile(username);
  const path = `/${encodeURIComponent(username)}` as const;

  if (!profile) {
    return {
      ...createPageMetadata({
        title: `@${username} not found`,
        description: `The @${username} profile has not been claimed on redirect.`,
        path,
      }),
      robots: { index: false, follow: true },
    };
  }

  const count = profile.links.length;
  return createPageMetadata({
    title: `@${username}`,
    description:
      count > 0
        ? `Find @${username} on ${count} social platform${count === 1 ? "" : "s"} with direct profile links.`
        : `Find @${username}'s social profile links on redirect.`,
    path,
  });
}

export default async function UsernamePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-5 lg:px-10">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <BackLink />

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3rem]">
              @<span className="text-foreground">{username}</span>
            </h1>
            <p className="text-base text-muted-foreground">
              Choose a platform
            </p>
          </div>

          {profile.links.length > 0 ? (
            <div className="space-y-2">
              {profile.links.map((link) => {
                const favicon = getFaviconUrl(link.platform, link.url);
                return (
                  <Link
                    key={link.platform}
                    href={`/${username}/${link.platform}`}
                    className="group flex w-full items-center gap-4 rounded-sm border border-border bg-card px-5 py-4 transition-colors duration-200 hover:bg-muted"
                  >
                    {favicon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={favicon}
                        alt=""
                        width={20}
                        height={20}
                        className="shrink-0 rounded-[2px]"
                      />
                    ) : (
                      <span className="size-5 shrink-0 rounded-[2px] bg-muted" />
                    )}
                    <span className="text-sm font-medium">
                      {PLATFORM_LABELS[link.platform] || link.platform}
                    </span>
                    <Icon
                      icon={ArrowRight01Icon}
                      className="ml-auto size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">No links added yet.</p>
          )}

          {/* {ADS_ENABLED && !profile.adFree && <AdSlot />} */}

          <Link
            href="/"
            className="inline-block text-sm text-link transition-colors duration-200 hover:text-foreground"
          >
            Create your own redirect
          </Link>
        </div>
      </div>
    </main>
  );
}
