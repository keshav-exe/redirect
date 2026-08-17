import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-xl space-y-6">
        <div className="space-y-3">
          <p className="text-sm tabular-nums text-muted-foreground">404</p>
          <h1
            className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3rem]"
            style={{ textWrap: "balance" }}
          >
            Page <span className="text-foreground">not found</span>
          </h1>
          <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground">
            That URL doesn&apos;t exist. Check the link, or head back home.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            Go home
          </Link>
          <Link
            href="/features"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            See features
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
