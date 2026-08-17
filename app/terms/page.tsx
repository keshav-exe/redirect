import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of service",
  description:
    "The terms for creating and using direct social profile links with redirect.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <MarketingShell>
      <article className="mx-auto w-full max-w-2xl space-y-10 pb-4">
        <header className="max-w-[65ch] space-y-2">
          <h1
            className="text-[2.5rem] leading-[1.08] text-foreground lg:text-[3rem]"
            style={{ textWrap: "balance" }}
          >
            Terms of service
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: Aug 2026</p>
        </header>

        <div className="max-w-[65ch] space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">The service</h2>
            <p>
              redirect provides short URLs that forward visitors to your social
              profiles. It&apos;s offered as-is, primarily as a personal project.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Your responsibility
            </h2>
            <p>
              You own the links you add. Don&apos;t use redirect for spam,
              phishing, or anything illegal. We can remove profiles that abuse
              the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Availability
            </h2>
            <p>
              No uptime guarantees. The service may change or go offline. We
              will try to give a heads up when we can.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Contact</h2>
            <p>
              Questions?{" "}
              <Link
                href="/advertise"
                className="text-link underline underline-offset-4"
              >
                Get in touch
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </MarketingShell>
  );
}
