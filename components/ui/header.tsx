import Link from "next/link";

interface HeaderProps {
  user?: {
    name?: string | null;
  } | null;
  onSignOut?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({ user, onSignOut, rightAction }: HeaderProps) {
  return (
    <header className="w-full px-6 py-5 border-b border-border">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-bold tracking-tighter hover:opacity-60 transition-opacity duration-200"
        >
          <span className="text-pink-500">re</span>direct
        </Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {user.name}
              </span>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Sign out
                </button>
              )}
            </>
          ) : (
            rightAction || (
              <Link
                href="/edit"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Create yours
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
