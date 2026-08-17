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
  if (centerContent) {
    return (
      <div className="flex min-h-dvh flex-col">
        <MarketingHeader />
        <main className="flex flex-1 flex-col justify-center px-6 pt-8 lg:px-10 lg:pt-16">
          {children}
        </main>
        <div className="px-6 pt-12 pb-[max(2rem,env(safe-area-inset-bottom))] lg:px-10 lg:pt-16">
          <MarketingFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <MarketingHeader />
      <div className="flex flex-1 flex-col px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] lg:px-10 lg:pt-16">
        <main className="flex-1">{children}</main>
        <MarketingFooter className="mt-16 lg:mt-24" />
      </div>
    </div>
  );
}
