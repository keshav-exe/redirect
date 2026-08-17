import { cn } from "@/lib/utils";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

interface MarketingShellProps {
  children: React.ReactNode;
  centerContent?: boolean;
}

export function MarketingShell({
  children,
  centerContent = false,
}: MarketingShellProps) {
  return (
    <div className={cn("flex flex-col", centerContent && "min-h-dvh")}>
      <MarketingHeader />
      <div
        className={cn(
          "flex flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 lg:px-10 lg:pt-16",
          centerContent && "flex-1"
        )}
      >
        <main
          className={cn(
            "flex flex-col",
            centerContent && "flex-1 justify-center"
          )}
        >
          {children}
        </main>
        <MarketingFooter sticky={centerContent} />
      </div>
    </div>
  );
}
