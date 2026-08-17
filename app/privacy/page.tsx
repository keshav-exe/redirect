import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createPageMetadata } from "@/lib/seo";
import { GITHUB_ISSUES_URL, SITE_NAME, SITE_URL } from "@/lib/site";

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
          <p className="text-sm text-muted-foreground">Last updated: August 18, 2026</p>
        </header>

        <div className="max-w-[65ch] space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Overview</h2>
            <p>
              {SITE_NAME} ({SITE_URL}) is an open-source tool that lets you
              create short links to your social profiles. This policy explains
              what information we collect, how we use it, and what we do not do
              with your data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Information we collect
            </h2>
            <p>When you create an account, we collect:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Your OAuth provider user ID (from Google or GitHub sign-in)
              </li>
              <li>Your display name and email address from your OAuth profile</li>
              <li>
                The profile data you choose to save: username and social link
                URLs
              </li>
            </ul>
            <p>
              When someone visits a redirect link, we process the request to
              serve the redirect. We do not log individual click events or build
              visitor profiles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              How we use your information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To authenticate you and associate your profile with your account</li>
              <li>To store and serve your redirect links</li>
              <li>To operate, maintain, and improve the service</li>
              <li>To respond to support requests or abuse reports</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              What we do not do
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>We do not sell your personal information</li>
              <li>We do not run click analytics or tracking pixels on redirects</li>
              <li>
                We do not use your data for advertising profiles or third-party
                marketing
              </li>
              <li>
                We do not share your profile data except as needed to operate
                the service (see Third parties below)
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Public information
            </h2>
            <p>
              Your chosen username and social links are publicly visible on your
              profile page (e.g. <code className="text-foreground">/{`{username}`}</code>
              ). Anyone with the URL can view this information. Do not add links
              or usernames you want to keep private.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Third-party services
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="font-medium text-foreground">Authentication</strong>{" "}
                — Google and GitHub via NextAuth.js. Their privacy policies apply
                to sign-in.
              </li>
              <li>
                <strong className="font-medium text-foreground">Database</strong>{" "}
                — Supabase (PostgreSQL) stores profile data.
              </li>
              <li>
                <strong className="font-medium text-foreground">Hosting</strong>{" "}
                — Vercel serves the application.
              </li>
              <li>
                <strong className="font-medium text-foreground">Redirect destinations</strong>{" "}
                — When a visitor follows a link, they leave {SITE_NAME} and
                are subject to the destination site&apos;s policies.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Data retention</h2>
            <p>
              We retain your profile data for as long as your account is active.
              You can delete your profile by removing all links and changing your
              username, or contact us to request account deletion. We may retain
              limited records as required by law or to prevent abuse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Security</h2>
            <p>
              We use industry-standard practices including HTTPS, secure session
              cookies, server-side database access, and row-level security on
              the database. No system is perfectly secure; use the service at
              your own discretion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Your rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct,
              or delete your personal data. To exercise these rights, open an
              issue on{" "}
              <Link
                href={GITHUB_ISSUES_URL}
                className="text-link underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:hi@kshv.me"
                className="text-link underline underline-offset-4"
              >
                hi@kshv.me
              </a>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Children</h2>
            <p>
              {SITE_NAME} is not directed at children under 13. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Changes</h2>
            <p>
              We may update this policy from time to time. The &quot;Last
              updated&quot; date at the top reflects the most recent revision.
              Continued use of the service after changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Contact</h2>
            <p>
              Questions about this policy?{" "}
              <Link
                href={GITHUB_ISSUES_URL}
                className="text-link underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open a GitHub issue
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:hi@kshv.me"
                className="text-link underline underline-offset-4"
              >
                hi@kshv.me
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </MarketingShell>
  );
}
