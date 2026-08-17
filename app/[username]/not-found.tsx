import Link from "next/link";
import { BackLink } from "@/components/ui/back-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProfileNotFound() {
  return (
    <main className="min-h-screen px-6 py-5 lg:px-10">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <BackLink />

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm tabular-nums text-muted-foreground">404</p>
            <h1
              className="text-[2.5rem] leading-[1.08] text-muted-foreground lg:text-[3rem]"
              style={{ textWrap: "balance" }}
            >
              Profile <span className="text-foreground">not found</span>
            </h1>
            <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground">
              This username hasn&apos;t been claimed yet, or the profile was
              removed.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/edit"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Claim a username
            </Link>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
