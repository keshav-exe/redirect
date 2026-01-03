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
    <div className="min-h-screen flex flex-col">
      <header className="w-full px-6 py-5">
        <nav className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight hover:opacity-60"
          >
            redirect
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full space-y-6 text-center">
          <h1 className="text-2xl font-medium tracking-tight">
            Link not found
          </h1>
          <p className="text-muted-foreground">
            @{username} doesn&apos;t have a {platform} link.
          </p>
          <Link
            href={`/${username}`}
            className="inline-flex px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            View all links
          </Link>
        </div>
      </main>
    </div>
  );
}
