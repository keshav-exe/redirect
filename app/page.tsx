"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/edit");
    }
  }, [status, router]);

  const handleClaim = () => {
    const params = new URLSearchParams();
    if (username) {
      params.set("username", username);
    }
    router.push(`/auth/signin${username ? `?${params.toString()}` : ""}`);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(value);
  };

  return (
    <main className="grid h-full min-h-screen p-4 gap-4">
      <div className="flex flex-col gap-6 ring-2 ring-offset-8 justify-between ring-border rounded-2xl bg-accent p-4">
        <div className="flex gap-6 justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-[110%] text-muted-foreground max-w-4xl">
              A simple tool that makes it <span className="text-primary">easier to keep track</span> of your social profiles, with just one <span className="text-blue-500 px-3 bg-blue-200 rounded-lg">dwaar.</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
              <div className="flex items-center flex-1 bg-card border border-border rounded-lg overflow-hidden">
                <span className="pl-4 text-muted-foreground text-sm whitespace-nowrap">
                  dwaar.to/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="yourname"
                  className="flex-1 px-2 py-3 text-sm bg-transparent outline-none placeholder:text-muted-foreground/50"
                />
                <span className="pr-4 text-muted-foreground text-sm whitespace-nowrap">
                  instagram
                </span>
              </div>
              <button
                onClick={handleClaim}
                className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
              >
                Claim dwaar
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/auth/signin">
              <Button variant="outline" size="icon">
                <HugeiconsIcon icon={User02Icon} className="size-5" />

              </Button>
            </Link>
          </div>
        </div>

        <footer className="flex items-end justify-between">
          <div className="space-y-1 lg:min-w-[200px]">
            <p className="text-2xl font-bold text-blue-500">द्वार</p>
            <p className="text-sm text-muted-foreground italic">dwaar (Sanskrit)</p>
            <p className="text-xs text-muted-foreground">gateway • entrance • door</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>•</span>
            <span>
              <Link href="/privacy">Privacy Policy</Link>
            </span>
            <span>•</span>
            <span>
              <Link href="/terms">Terms of Service</Link>
            </span>
          </div>
        </footer>
      </div>

    </main>
  );
}
