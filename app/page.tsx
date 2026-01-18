"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
      <div className="flex flex-col lg:flex-col-reverse gap-6 ring-2 ring-offset-8 ring-border rounded-2xl bg-accent p-4">
        <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter leading-[110%] text-muted-foreground max-w-4xl">
          A simple tool that makes it <span className="text-primary">easier to keep track</span> of your social profiles, with just one <span className="text-blue-500 px-3 bg-blue-200 rounded-lg">dwaar (door).</span>
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 max-w-2xl">
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
    </main>
  );
}
