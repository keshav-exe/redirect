"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const handleSignIn = () => {
    const callbackUrl = username ? `/edit?username=${username}` : "/edit";
    signIn("google", { callbackUrl });
  };

  return (
    <main className="grid h-full min-h-screen p-4 gap-4">
      <div className="flex flex-col gap-6 ring-2 ring-offset-8 ring-border rounded-2xl bg-accent p-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          ← Back
        </Link>

        <div className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-[110%] text-muted-foreground">
              Welcome <span className="text-primary">back</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to manage your redirects
            </p>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-card border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our terms of service
          </p>
        </div>
      </div>
    </main>
  );
}
