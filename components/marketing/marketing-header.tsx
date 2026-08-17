"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { User02Icon } from "@hugeicons/core-free-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/advertise", label: "Advertise" },
];

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

      <nav className="flex items-center gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}

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
