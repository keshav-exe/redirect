import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createPageMetadata } from "@/lib/seo";
import { GITHUB_ISSUES_URL, SITE_NAME, SITE_URL } from "@/lib/site";

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
          <p className="text-sm text-muted-foreground">Last updated: August 18, 2026</p>
        </header>

        <div className="max-w-[65ch] space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Agreement</h2>
            <p>
              By accessing or using {SITE_NAME} ({SITE_URL}), you agree to these
              Terms of Service. If you do not agree, do not use the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">The service</h2>
            <p>
              {SITE_NAME} provides short URLs that forward visitors to your
              social profiles. The software is open source under the MIT License.
              The hosted instance at {SITE_URL} is provided as-is, primarily as a
              free personal project.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Eligibility</h2>
            <p>
              You must be at least 13 years old to use the service. You must
              provide accurate information when creating an account and may only
              claim usernames you have a legitimate right to use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Your account</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                You are responsible for maintaining the security of your OAuth
                account used to sign in
              </li>
              <li>
                You are responsible for all activity under your {SITE_NAME}{" "}
                profile
              </li>
              <li>
                Usernames are unique and assigned on a first-come basis. We do
                not guarantee permanent reservation of any username
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Acceptable use
            </h2>
            <p>You agree not to use {SITE_NAME} to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Phish, scam, or deceive visitors</li>
              <li>Distribute malware or link to illegal content</li>
              <li>Spam, automate abuse, or attempt to overwhelm the service</li>
              <li>Impersonate others or infringe on trademarks without permission</li>
              <li>Circumvent security measures or access others&apos; accounts</li>
              <li>Violate any applicable law or regulation</li>
            </ul>
            <p>
              You own the links you add. You represent that you have the right
              to share them and that they comply with the destination
              platform&apos;s terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Content and moderation
            </h2>
            <p>
              Profile pages display the username and links you provide. We do
              not pre-screen content but reserve the right to remove profiles,
              disable redirects, or terminate access for violations of these
              terms or to protect the service and its users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Availability and changes
            </h2>
            <p>
              We do not guarantee uptime, availability, or that any feature
              will continue to exist. The service may change, break, or go
              offline at any time, with or without notice. We may modify these
              terms by updating this page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Disclaimer of warranties
            </h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Limitation of liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, {SITE_NAME.toUpperCase()}{" "}
              AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY
              LOSS OF DATA, PROFITS, OR GOODWILL, ARISING FROM YOUR USE OF THE
              SERVICE.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">
              Open source
            </h2>
            <p>
              The source code is available under the MIT License. Self-hosting
              is permitted. These terms apply to the hosted service at{" "}
              {SITE_URL}; your obligations when self-hosting are governed by
              the MIT License and your own policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Termination</h2>
            <p>
              You may stop using the service at any time. We may suspend or
              terminate your access if you violate these terms or if we
              discontinue the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-medium text-foreground">Contact</h2>
            <p>
              Questions about these terms?{" "}
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
