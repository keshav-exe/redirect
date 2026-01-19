"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
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
          } else {
            // If no profile exists, check for username param from home page
            const urlUsername = searchParams.get("username");
            if (urlUsername) {
              setUsername(urlUsername);
            }
          }
        })
        .catch(() => { })
        .finally(() => setProfileLoading(false));
    } else if (status !== "loading") {
      setTimeout(() => setProfileLoading(false), 1000);
    }
  }, [status, session, searchParams]);

  if (status === "loading" || profileLoading) {
    return (
      <main className="grid h-full min-h-screen p-4">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
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

  const normalizeUrl = (platform: Platform, input: string): string => {
    const trimmed = input.trim();

    // If it's already a full URL, return it
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }

    // Remove @ if present
    const handle = trimmed.replace(/^@/, "");

    // Convert handle to full URL based on platform
    const platformUrls: Record<Platform, string> = {
      twitter: `https://twitter.com/${handle}`,
      instagram: `https://instagram.com/${handle}`,
      linkedin: `https://linkedin.com/in/${handle}`,
      github: `https://github.com/${handle}`,
      youtube: `https://youtube.com/@${handle}`,
      tiktok: `https://tiktok.com/@${handle}`,
      website: trimmed.startsWith("www.") ? `https://${trimmed}` : trimmed,
    };

    return platformUrls[platform] || trimmed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validLinks = links
      .filter((link) => link.url.trim() !== "")
      .map((link) => ({
        platform: link.platform,
        url: normalizeUrl(link.platform, link.url),
      }));

    if (!username.trim()) {
      setError("Username is required");
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
      setError(data.error || data.details || "Failed to save profile");
      setLoading(false);
    }
  };

  const availablePlatforms = PLATFORMS.filter(
    (p) => !links.some((l) => l.platform === p.value)
  );

  return (
    <main className="grid h-full min-h-screen p-4 gap-4">
      <div className="flex flex-col gap-6 ring-2 ring-offset-8 ring-border rounded-2xl bg-accent p-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Back
          </Link>
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Sign out
            </button>
          )}
        </div>

        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[110%] text-muted-foreground">
              {isEdit ? (
                <>Edit your <span className="text-primary">dwaar</span></>
              ) : (
                <>Create your <span className="text-primary">dwaar</span></>
              )}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isEdit
                ? "Update your social links"
                : "Claim your username and add your social links"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="space-y-3">
              <label htmlFor="username" className="text-sm font-medium text-muted-foreground">
                Your username
              </label>
              <div className="flex items-stretch overflow-hidden rounded-lg border border-border bg-card">
                <span className="flex items-center px-4 text-muted-foreground text-sm">
                  dwaar.to/
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="yourname"
                  required
                  disabled={isEdit}
                  className={`flex-1 px-2 py-3 text-sm bg-transparent outline-none ${isEdit ? "cursor-not-allowed opacity-60" : ""}`}
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
                <label className="text-sm font-medium text-muted-foreground">
                  Social links (optional)
                </label>
                {availablePlatforms.length > 0 && (
                  <button
                    type="button"
                    onClick={addLink}
                    className="text-sm text-primary hover:opacity-80 transition-opacity duration-200 font-medium"
                  >
                    + Add link
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start p-4 bg-card border border-border rounded-lg"
                  >
                    <div className="flex-1 space-y-3">
                      <Select
                        value={link.platform}
                        onValueChange={(value) =>
                          updateLink(index, "platform", value || link.platform)
                        }
                      >
                        <SelectTrigger className="w-full bg-transparent border border-border">
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
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(index, "url", e.target.value)}
                        placeholder="@yourhandle or full URL"
                        className="w-full px-3 py-2 text-sm bg-transparent border border-border rounded-lg outline-none focus:border-foreground transition-colors duration-200"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter @yourhandle or full URL (e.g., https://twitter.com/yourname)
                      </p>
                    </div>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-200"
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
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : isEdit ? (
                  "Save changes"
                ) : (
                  "Create dwaar"
                )}
              </button>
              {isEdit && (
                <Link
                  href={`/${username}`}
                  className="px-6 py-3 bg-card border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors duration-200 whitespace-nowrap"
                >
                  View profile
                </Link>
              )}
            </div>
          </form>

          {isEdit && (
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Your dwaar:{" "}
                <span className="text-foreground font-medium">
                  dwaar.to/{username}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
