import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy policy",
  description:
    "How redirect handles account information, social profile links, and visitor privacy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <article className="mx-auto w-full max-w-2xl space-y-10 pb-4">
        <header className="max-w-[65ch] space-y-2">
          <h1
            className="text-[2.5rem] leading-[1.08] text-foreground lg:text-[3rem]"
            style={{ textWrap: "balance" }}
          >
            Privacy policy
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: Aug 2026</p>
        </header>

        <div className="max-w-[65ch] space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              What we collect
            </h2>
            <p>
              When you sign in with Google, we store your OAuth user ID, display
              name, and the profile data you choose to save: username and social
              links.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              What we don&apos;t do
            </h2>
            <p>
              We don&apos;t sell your data, run analytics on redirect clicks, or
              track visitors beyond what&apos;s needed to serve the redirect.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Third parties
            </h2>
            <p>
              Authentication is handled by Google via NextAuth. Database hosting
              is on Supabase. Redirect destinations are third-party sites with
              their own policies.
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
