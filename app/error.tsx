"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-xl space-y-6">
        <div className="space-y-3">
          <h1
            className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3rem]"
            style={{ textWrap: "balance" }}
          >
            Something <span className="text-foreground">went wrong</span>
          </h1>
          <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground">
            We hit an unexpected error. Try again, or go back home.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Try again
          </button>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Go home
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
