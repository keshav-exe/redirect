import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createPageMetadata({
  title: "Features",
  description:
    "One clean URL per platform. Instant redirects, link previews, and real favicons. Nothing else.",
  path: "/features",
});

const features = [
  {
    title: "One link per platform",
    description:
      "/you/twitter, /you/instagram, /you/github. Each one goes straight to the right profile. No link-in-bio page in the way.",
  },
  {
    title: "Instant redirects",
    description:
      "Humans hit the destination immediately. No loading screens, no interstitials, no analytics dashboard slowing things down.",
  },
  {
    title: "Rich link previews",
    description:
      "When you share a redirect link, crawlers get a custom preview image showing your username and the destination platform.",
  },
  {
    title: "Real favicons",
    description:
      "Platform icons come from the actual sites. Twitter, GitHub, Reddit. Not hand-drawn SVGs that go stale.",
  },
];

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="max-w-[65ch] space-y-4">
          <h1
            className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            Everything you need.{" "}
            <span className="text-foreground">Nothing you don&apos;t.</span>
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            redirect is a permalink layer for your social profiles. Not another
            link-in-bio builder with themes, widgets, and upsells.
          </p>
        </header>

        <dl className="space-y-6">
          {features.map((feature) => (
            <div key={feature.title}>
              <dt className="text-base font-medium text-foreground">
                {feature.title}
              </dt>
              <dd className="mt-1.5 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>

        <aside className="rounded-sm border border-border bg-card px-6 py-8">
          <p className="font-medium tabular-nums text-2xl text-foreground">
            /keshav/twitter
          </p>
          <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
            One URL. One platform. One redirect. That is the whole product.
          </p>
        </aside>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Claim your redirect
        </Link>
      </div>
    </MarketingShell>
  );
}
