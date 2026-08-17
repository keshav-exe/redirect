import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ADVERTISE_PAGE_URL } from "@/lib/ads";

export function AdSlot() {
  return (
    <div className="rounded-sm border border-dashed border-border bg-card/40 px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          Sponsored
        </span>
        <Link
          href={ADVERTISE_PAGE_URL}
          className="inline-flex items-center gap-1 text-xs text-link transition-colors duration-200 hover:text-foreground"
        >
          Advertise here
          <Icon icon={ArrowRight01Icon} className="size-3" />
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        This spot is open. Put your brand in front of people right before they
        click through.
      </p>
    </div>
  );
}
