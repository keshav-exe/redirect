import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-2xl font-normal tracking-tight">
          Universal social redirects
        </h1>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <Link
              href="/example/twitter"
              className="underline decoration-1 underline-offset-2 hover:no-underline"
            >
              /example/twitter
            </Link>
          </p>
          <Link
            href="/edit"
            className="inline-block text-sm underline decoration-1 underline-offset-2 hover:no-underline"
          >
            Create yours
          </Link>
        </div>
      </div>
    </div>
  );
}
