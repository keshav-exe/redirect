"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

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
    <MarketingShell centerContent>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <h1
          className="max-w-[65ch] text-[2.75rem] leading-[1.08] text-muted-foreground lg:text-[3.95rem]"
          style={{ textWrap: "balance" }}
        >
          A free tool that makes it{" "}
          <span className="text-foreground">easier to keep track</span> of your
          social profiles, with just one{" "}
          <span className="text-foreground">redirect.</span>
        </h1>

        <div className="flex max-w-xl flex-col gap-3 sm:flex-row">
          <InputGroup size="lg" className="min-w-0 flex-1 bg-card">
            <InputGroupAddon align="inline-start">
              <InputGroupText className="pl-1 tabular-nums">/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="yourname"
              spellCheck={false}
              autoComplete="off"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText className="pr-1 tabular-nums">
                /instagram
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Button
            onClick={handleClaim}
            size="lg"
            className="w-full shrink-0 px-5 sm:w-auto"
          >
            Claim yours
          </Button>
        </div>

        <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
          Curious how it works? Read the{" "}
          <Link
            href="/features"
            className="text-link underline underline-offset-4 transition-colors duration-150 ease-out hover:text-foreground"
          >
            features
          </Link>{" "}
          page. Running a brand? See{" "}
          <Link
            href="/advertise"
            className="text-link underline underline-offset-4 transition-colors duration-150 ease-out hover:text-foreground"
          >
            advertise
          </Link>
          .
        </p>
      </div>
    </MarketingShell>
  );
}
