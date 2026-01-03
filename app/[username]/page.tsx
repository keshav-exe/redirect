import { redirect } from "next/navigation";
import { getProfile } from "@/lib/data";
import Link from "next/link";

export const runtime = "edge";

export default async function UsernamePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <p className="text-sm text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  // If only one platform, redirect immediately
  if (profile.links.length === 1) {
    redirect(`/${username}/${profile.links[0].platform}`);
  }

  // Multiple platforms - show selector
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-xl font-normal">{username}</h1>
        <div className="space-y-2">
          {profile.links.map((link) => (
            <Link
              key={link.platform}
              href={`/${username}/${link.platform}`}
              className="block text-sm underline decoration-1 underline-offset-2 hover:no-underline"
            >
              {link.platform}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
