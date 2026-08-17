"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { StarIcon, User02Icon } from "@hugeicons/core-free-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { ADS_ENABLED } from "@/lib/ads";
import { GITHUB_REPO_URL } from "@/lib/site";

const navLinks = [
  { href: "/features", label: "Features" },
  ...(ADS_ENABLED ? [{ href: "/advertise", label: "Advertise" }] : []),
];

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-1.005-.54-1.005-1.185 0-1.845.72-.375 1.23-1.41 1.23-2.385 0-1.155-.795-2.025-2.205-2.025-1.53 0-2.385 1.125-2.385 2.325 0 .855.315 1.44.825 1.875-.27.705-1.11 2.955-.27 3.675.45.375 1.26.405 1.965.135 1.395-.54 2.25-1.875 2.25-3.375 0-2.46-1.755-4.185-4.275-4.185-2.925 0-4.635 2.16-4.635 4.395 0 .855.33 1.785.75 2.295.075.09.09.165.06.255-.075.285-.24.915-.27 1.035-.045.165-.135.195-.315.12-1.245-.585-2.025-2.415-2.025-3.885 0-3.15 2.295-6.045 6.615-6.045 3.465 0 6.15 2.475 6.15 5.775 0 3.435-2.16 6.195-5.175 6.195-1.005 0-1.95-.525-2.265-1.125l-.615 2.355c-.225.855-.825 1.935-1.23 2.595 0 .015 0 .03-.015.045C9.435 23.565 10.695 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0Z" />
    </svg>
  );
}

function GitHubStarLink() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("https://api.github.com/repos/keshav-exe/redirect")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => { });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Link
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground h-10"
      aria-label="View redirect on GitHub"
    >
      <Icon icon={StarIcon} className="size-4 fill-yellow-400 text-yellow-400" />
      <span className="hidden sm:inline">GitHub</span>
      {stars !== null && (
        <span className="tabular-nums text-foreground">{stars.toLocaleString()}</span>
      )}
    </Link>
  );
}

export function MarketingHeader() {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  return (
    <header className="flex items-center justify-between px-6 py-5 lg:px-10">
      <Link
        href="/"
        className="font-display text-sm tracking-wide text-foreground"
      >
        redirect
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}

        <GitHubStarLink />

        {isAuthed ? (
          <Link
            href="/edit"
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            Go to dashboard
          </Link>
        ) : (
          <Link href="/auth/signin">
            <Button variant="outline" size="icon" aria-label="Sign in">
              <Icon icon={User02Icon} className="size-5" />
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
