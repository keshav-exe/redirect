import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5">
        <nav className="max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="text-sm font-medium tracking-tight hover:opacity-60"
          >
            redirect
          </Link>
          <Link
            href="/edit"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Create yours
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            One link for all
            <br />
            your socials
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Clean URLs that redirect instantly. No bloat, no dashboards, just fast redirects.
          </p>

          {/* URL Preview */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl">
              <span className="text-muted-foreground text-sm">redirect.to/</span>
              <span className="text-sm font-medium">yourname</span>
              <span className="text-muted-foreground text-sm">/twitter</span>
            </div>
            <Link
              href="/edit"
              className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Claim yours
            </Link>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="px-6 py-20 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-12 sm:gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Instant redirects</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Redirects happen at the edge. Sub-50ms response times worldwide.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Universal links</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Works with Twitter, Instagram, GitHub, LinkedIn, YouTube, and more.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Zero friction</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No analytics, no themes, no bloat. Just redirects that work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            redirect
          </span>
          <div className="flex items-center gap-6">
            <Link 
              href="/edit" 
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Create
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
