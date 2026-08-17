"use client";

import { useState } from "react";
import { Mail01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  ADVERTISE_CONTACT_EMAIL,
  ADVERTISE_CONTACT_URL,
} from "@/lib/ads";
import { cn } from "@/lib/utils";

const buttonClassName = cn(
  buttonVariants({ variant: "default", size: "lg" }),
  "inline-flex shrink-0 items-center gap-2 pl-4 pr-3.5"
);

function SwappingIcon({ active: copied }: { active: boolean }) {
  return (
    <span className="relative size-4 shrink-0">
      <Icon
        icon={Mail01Icon}
        className={cn(
          "absolute inset-0 size-4 transition-opacity duration-150 ease-out motion-reduce:transition-none",
          copied && "opacity-0"
        )}
        aria-hidden={copied}
      />
      <Icon
        icon={Tick02Icon}
        className={cn(
          "absolute inset-0 size-4 transition-opacity duration-150 ease-out motion-reduce:transition-none",
          !copied && "opacity-0"
        )}
        aria-hidden={!copied}
      />
    </span>
  );
}

function SwappingLabel({
  active: copied,
  idle,
  success,
}: {
  active: boolean;
  idle: string;
  success: string;
}) {
  return (
    <span className="grid *:col-start-1 *:row-start-1">
      <span
        className={cn(
          "transition-opacity duration-150 ease-out motion-reduce:transition-none",
          copied && "opacity-0"
        )}
        aria-hidden={copied}
      >
        {idle}
      </span>
      <span
        className={cn(
          "transition-opacity duration-150 ease-out motion-reduce:transition-none",
          !copied && "opacity-0"
        )}
        aria-hidden={!copied}
      >
        {success}
      </span>
    </span>
  );
}

export function AdvertiseContactButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ADVERTISE_CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = ADVERTISE_CONTACT_URL;
    }
  };

  return (
    <>
      <a
        href={ADVERTISE_CONTACT_URL}
        className={cn(
          buttonClassName,
          "[@media(hover:hover)_and_(pointer:fine)]:hidden"
        )}
      >
        <Icon icon={Mail01Icon} className="size-4 shrink-0" />
        Get in touch
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          buttonClassName,
          "hidden [@media(hover:hover)_and_(pointer:fine)]:inline-flex"
        )}
        aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
      >
        <SwappingIcon active={copied} />
        <SwappingLabel active={copied} idle="Copy email" success="Copied" />
      </button>
    </>
  );
}
