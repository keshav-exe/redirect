import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-border">
      <div className="max-w-[64rem] mx-auto flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          redirect
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/edit"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Create
          </Link>
        </div>
      </div>
    </footer>
  );
}
