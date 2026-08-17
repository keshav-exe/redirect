import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const RESERVED_SEGMENTS = new Set([
  "features",
  "advertise",
  "privacy",
  "terms",
  "edit",
  "auth",
  "api",
]);

function isProfileLookup(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || segments.length > 2) {
    return false;
  }

  if (RESERVED_SEGMENTS.has(segments[0])) {
    return false;
  }

  return true;
}

export const config = {
  matcher: ["/api/profile", "/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const scope =
    pathname === "/api/profile"
      ? request.method === "POST"
        ? "api:write"
        : "api:read"
      : isProfileLookup(pathname)
        ? "profile"
        : null;

  if (!scope) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);
  const result = rateLimit(ip, scope);

  if (!result.success) {
    const headers = { "Retry-After": String(result.retryAfter) };

    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers }
      );
    }

    return new NextResponse("Too many requests", { status: 429, headers });
  }

  return NextResponse.next();
}
