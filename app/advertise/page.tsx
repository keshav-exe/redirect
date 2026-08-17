import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { AdvertiseContactButton } from "@/components/marketing/advertise-contact-button";
import { createPageMetadata } from "@/lib/seo";
import { ADS_ENABLED } from "@/lib/ads";

export const metadata: Metadata = createPageMetadata({
  title: "Advertise",
  description:
    "Put your brand in front of people right before they click through to a social profile.",
  path: "/advertise",
});

const reasons = [
  {
    title: "High intent moment",
    description:
      "Your ad shows up when someone is already choosing where to go next. They picked a platform. They are about to leave.",
  },
  {
    title: "Real people, not bots",
    description:
      "These are humans browsing creator and personal profile pages, not empty impressions on a feed.",
  },
  {
    title: "One clean placement",
    description:
      "No banner farm. One sponsored slot on profile pages. Your message sits there without fighting for attention.",
  },
];

export default function AdvertisePage() {
  if (!ADS_ENABLED) {
    notFound();
  }

  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <header className="max-w-[65ch] space-y-4">
          <h1
            className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3.5rem]"
            style={{ textWrap: "balance" }}
          >
            Reach people{" "}
            <span className="text-foreground">right before they click.</span>
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            redirect helps people jump from one short link to their Twitter,
            Instagram, GitHub, or whatever else they use. Your brand can show up
            on that page, once, in a spot that actually gets read.
          </p>
        </header>

        <dl className="space-y-6">
          {reasons.map((item) => (
            <div key={item.title}>
              <dt className="text-base font-medium text-foreground">
                {item.title}
              </dt>
              <dd className="mt-1.5 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <aside className="space-y-4 rounded-sm border border-border bg-card px-6 py-8">
          <p className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
            What you get
          </p>
          <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Sponsored placement on public profile pages</li>
            <li>Your logo, name, and one line of copy</li>
            <li>Link out to your site or landing page</li>
            <li>Manual setup. No self-serve dashboard yet.</li>
          </ul>
        </aside>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <AdvertiseContactButton />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Tell us who you are and what you are promoting. We will reply with
            availability and pricing.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Using redirect for yourself?{" "}
          <Link
            href="/"
            className="text-link underline underline-offset-4 transition-colors duration-150 ease-out hover:text-foreground"
          >
            Claim a username
          </Link>
          .
        </p>
      </div>
    </MarketingShell>
  );
}
