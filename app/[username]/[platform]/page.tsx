import { redirect } from "next/navigation";
import { getProfileLink, buildPlatformUrl } from "@/lib/data";
import type { Platform } from "@/lib/types";
import Link from "next/link";

export const runtime = "nodejs";

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ username: string; platform: string }>;
}) {
  const { username, platform } = await params;

  const url = await getProfileLink(username, platform);
  if (url) {
    const normalizedPlatform =
      platform === "x" ? "twitter" : (platform as Platform);
    const redirectUrl = buildPlatformUrl(normalizedPlatform, url);
    redirect(redirectUrl);
  }

  return (
    <main className="grid h-full min-h-screen p-4 gap-4">
      <div className="flex flex-col gap-6 ring-2 ring-offset-8 ring-border rounded-2xl bg-accent p-6">
        <Link
          href={`/${username}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          ← Back
        </Link>
        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[110%] text-muted-foreground">
              Link <span className="text-primary">not found</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              @{username} doesn&apos;t have a {platform} link.
            </p>
          </div>
          <Link
            href={`/${username}`}
            className="inline-flex px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            View all links
          </Link>
        </div>
      </div>
    </main>
  );
}
