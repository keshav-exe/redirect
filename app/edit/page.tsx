"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Platform, ProfileLink } from "@/lib/types";
import { PLATFORM_ORDER, PLATFORM_LABELS } from "@/lib/platforms";
import { PlusSignIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { BackLink } from "@/components/ui/back-link";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import {
  AUTH_ERROR_CODES,
  getSignInUrl,
} from "@/lib/errors";

const PLATFORMS: { value: Platform; label: string }[] = PLATFORM_ORDER.map(
  (value) => ({ value, label: PLATFORM_LABELS[value] })
);

function EditPageContent() {
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
  const [adFree, setAdFree] = useState(false);

  const handleAuthFailure = useCallback(
    async (status: number, code?: string) => {
      if (status === 401) {
        await signOut({
          callbackUrl: getSignInUrl(AUTH_ERROR_CODES.SESSION_EXPIRED),
        });
        return true;
      }

      if (status === 404 && code === AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND) {
        await signOut({
          callbackUrl: getSignInUrl(
            AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND,
            searchParams.get("username")
          ),
        });
        return true;
      }

      return false;
    },
    [searchParams]
  );

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.id) {
      void signOut({
        callbackUrl: getSignInUrl(AUTH_ERROR_CODES.SESSION_EXPIRED),
      });
      return;
    }

    if (status === "authenticated" && session?.user?.id) {
      fetch("/api/profile")
        .then(async (res) => {
          const data = await res.json();

          if (await handleAuthFailure(res.status, data.code)) {
            return;
          }

          if (!res.ok) {
            setError(data.error || "Failed to load your profile.");
            return;
          }

          if (data.profile) {
            setUsername(data.profile.username);
            setLinks(
              data.profile.links.length > 0
                ? data.profile.links
                : [{ platform: "twitter", url: "" }]
            );
            setAdFree(data.profile.adFree ?? false);
            setIsEdit(true);
          } else {
            const urlUsername = searchParams.get("username");
            if (urlUsername) {
              setUsername(urlUsername);
            }
          }
        })
        .catch(() => {
          setError("Couldn't reach the server. Check your connection and try again.");
        })
        .finally(() => setProfileLoading(false));
    } else if (status !== "loading") {
      setProfileLoading(false);
    }
  }, [status, session, searchParams, handleAuthFailure]);

  if (status === "loading" || profileLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground" />
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
      reddit: `https://reddit.com/u/${handle}`,
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
      adFree,
    };

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const data = await res.json();

    if (await handleAuthFailure(res.status, data.code)) {
      return;
    }

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
    <main className="min-h-screen px-6 py-5 lg:px-10">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <BackLink />
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Sign out
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3rem]">
              {isEdit ? (
                <>Edit your <span className="text-foreground">redirect</span></>
              ) : (
                <>Create your <span className="text-foreground">redirect</span></>
              )}
            </h1>
            <p className="text-base text-muted-foreground">
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
              <div className="flex items-stretch overflow-hidden rounded-sm border border-border bg-card">
                <span className="flex items-center px-4 text-muted-foreground text-sm">
                  /
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
                    className="inline-flex items-center gap-1 text-sm font-medium text-link transition-opacity duration-200 hover:opacity-80"
                  >
                    <Icon icon={PlusSignIcon} className="size-3.5" />
                    Add link
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-sm border border-border bg-card p-4"
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
                        className="w-full rounded-sm border border-border bg-transparent px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-foreground"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter @yourhandle or full URL (e.g., https://twitter.com/yourname)
                      </p>
                    </div>
                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="p-2 text-muted-foreground transition-colors duration-200 hover:text-destructive"
                        aria-label="Remove link"
                      >
                        <Icon icon={Cancel01Icon} className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsorship */}
            <div className="flex items-center justify-between gap-4 rounded-sm border border-border bg-card px-4 py-3">
              <label htmlFor="ad-free" className="cursor-pointer select-none">
                <span className="block text-sm font-medium">Ad-free profile</span>
                <span className="block text-xs text-muted-foreground">
                  Hide the sponsor slot on your public page
                </span>
              </label>
              <Switch
                id="ad-free"
                checked={adFree}
                onCheckedChange={setAdFree}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-sm bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
              {isEdit && (
                <Link
                  href={`/${username}`}
                  className="whitespace-nowrap rounded-sm border border-border bg-card px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-muted"
                >
                  View profile
                </Link>
              )}
            </div>
          </form>

          {isEdit && (
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Your link:{" "}
                <span className="text-foreground font-medium">
                  /{username}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function EditPage() {
  return (
    <Suspense fallback={null}>
      <EditPageContent />
    </Suspense>
  );
}
