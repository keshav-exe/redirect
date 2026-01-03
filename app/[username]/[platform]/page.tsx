import { redirect } from "next/navigation";
import { getProfileLink, buildPlatformUrl } from "@/lib/data";
import type { Platform } from "@/lib/types";

export const runtime = "edge";

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ username: string; platform: string }>;
}) {
  const { username, platform } = await params;

  const url = await getProfileLink(username, platform as Platform);
  if (url) {
    const redirectUrl = buildPlatformUrl(platform as Platform, url);
    redirect(redirectUrl);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-sm text-muted-foreground">Link not found</p>
      </div>
    </div>
  );
}
