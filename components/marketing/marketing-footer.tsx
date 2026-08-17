import Link from "next/link";
import { cn } from "@/lib/utils";
import { ADS_ENABLED } from "@/lib/ads";

interface MarketingFooterProps {
  className?: string;
}

export function MarketingFooter({ className }: MarketingFooterProps) {
  return (
    <footer
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <p className="font-display text-2xl text-foreground">redirect</p>
        <p className="text-sm text-muted-foreground">one link, every platform</p>
        <p className="text-xs text-muted-foreground">
          no bloat, no dashboards, just works
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <Link
          href="/features"
          className="transition-colors duration-150 ease-out hover:text-foreground"
        >
          Features
        </Link>
        {ADS_ENABLED && (
          <Link
            href="/advertise"
            className="transition-colors duration-150 ease-out hover:text-foreground"
          >
            Advertise
          </Link>
        )}
        <Link
          href="/privacy"
          className="transition-colors duration-150 ease-out hover:text-foreground"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="transition-colors duration-150 ease-out hover:text-foreground"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
}
