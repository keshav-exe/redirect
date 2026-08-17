import Link from "next/link";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  href?: string;
  className?: string;
  children?: string;
}

export function BackLink({
  href = "/",
  className,
  children = "Back",
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground",
        className
      )}
    >
      <Icon icon={ArrowLeft01Icon} className="size-4" />
      {children}
    </Link>
  );
}
