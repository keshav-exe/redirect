"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Platform, ProfileLink } from "@/lib/types";
import Link from "next/link";

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "twitter", label: "Twitter / X" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "website", label: "Website" },
];

export default function EditPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [links, setLinks] = useState<ProfileLink[]>([
    { platform: "twitter", url: "" },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetch("/api/profile")
        .then((res) => res.json())
        .then((data) => {
          if (data.profile) {
            setUsername(data.profile.username);
            setLinks(
              data.profile.links.length > 0
                ? data.profile.links
                : [{ platform: "twitter", url: "" }]
            );
            setIsEdit(true);
          }
        })
        .catch(() => {})
        .finally(() => setProfileLoading(false));
    } else if (status !== "loading") {
      setProfileLoading(false);
    }
  }, [status, session]);

  if (status === "loading" || profileLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
        </main>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="max-w-sm w-full space-y-8 text-center">
            <div className="space-y-3">
              <h1 className="text-2xl font-medium tracking-tight">
                Create your redirect
              </h1>
              <p className="text-muted-foreground">
                Sign in to claim your username
              </p>
            </div>
            <Link
              href="/auth/signin"
              className="inline-flex w-full justify-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Sign in to continue
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const addLink = () => {
    const usedPlatforms = links.map((l) => l.platform);
    const nextPlatform = PLATFORMS.find((p) => !usedPlatforms.includes(p.value));
    if (nextPlatform) {
      setLinks([...links, { platform: nextPlatform.value, url: "" }]);
    }
  };

  const updateLink = (index: number, field: keyof ProfileLink, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validLinks = links.filter((link) => link.url.trim() !== "");
    if (!username.trim() || validLinks.length === 0) {
      setError("Username and at least one link required");
      setLoading(false);
      return;
    }

    const profile = {
      username: username.trim().toLowerCase(),
      links: validLinks,
      isEdit,
    };

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const data = await res.json();

    if (res.ok) {
      router.push(`/${profile.username}`);
    } else {
      setError(data.error || "Failed to save profile");
      setLoading(false);
    }
  };

  const availablePlatforms = PLATFORMS.filter(
    (p) => !links.some((l) => l.platform === p.value)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium tracking-tight">
              {isEdit ? "Edit your profile" : "Create your redirect"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isEdit
                ? "Update your social links"
                : "Claim your username and add your social links"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="flex items-center">
                <span className="px-4 py-2.5 bg-muted text-muted-foreground text-sm rounded-l-xl border border-r-0 border-border">
                  redirect.to/
                </span>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="yourname"
                  required
                  disabled={isEdit}
                  className={`rounded-l-none ${isEdit ? "bg-muted text-muted-foreground" : ""}`}
                />
              </div>
              {isEdit && (
                <p className="text-xs text-muted-foreground">
                  Username cannot be changed
                </p>
              )}
            </div>

            {/* Links */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Social links</label>
                {availablePlatforms.length > 0 && (
                  <button
                    type="button"
                    onClick={addLink}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    + Add link
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-start p-4 bg-card border border-border rounded-xl"
                  >
                    <div className="flex-1 space-y-3">
                      <Select
                        value={link.platform}
                        onValueChange={(value) =>
                          updateLink(index, "platform", value)
                        }
                      >
                        <SelectTrigger className="w-full bg-muted/50 border-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PLATFORMS.filter(
                            (p) =>
                              p.value === link.platform ||
                              !links.some((l) => l.platform === p.value)
                          ).map((platform) => (
                            <SelectItem key={platform.value} value={platform.value}>
                              {platform.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(index, "url", e.target.value)}
                        placeholder="https://twitter.com/yourname"
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      />
                    </div>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Remove link"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M12 4L4 12M4 4l8 8" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                  Saving...
                </span>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Create redirect"
              )}
            </button>
          </form>

          {isEdit && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Your redirect:{" "}
                <Link
                  href={`/${username}`}
                  className="text-foreground hover:underline"
                >
                  redirect.to/{username}
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Header({ session }: { session?: { user?: { name?: string | null } } | null }) {
  return (
    <header className="w-full px-6 py-5 border-b border-border">
      <nav className="max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight hover:opacity-60"
        >
          redirect
        </Link>
        {session?.user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
