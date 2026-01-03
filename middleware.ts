import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProfileLink, buildPlatformUrl } from "@/lib/data";
import type { Platform } from "@/lib/types";

export const runtime = "edge";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

const VALID_PLATFORMS: Platform[] = [
  "twitter",
  "instagram",
  "linkedin",
  "github",
  "youtube",
  "tiktok",
  "website",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for edit route and root
  if (pathname === "/edit" || pathname === "/") {
    return NextResponse.next();
  }

  // Match /[username]/[platform]
  const usernamePlatformMatch = pathname.match(/^\/([^/]+)\/([^/]+)$/);
  if (usernamePlatformMatch) {
    const [, username, platform] = usernamePlatformMatch;

    if (VALID_PLATFORMS.includes(platform as Platform)) {
      const url = await getProfileLink(username, platform as Platform);
      if (url) {
        const redirectUrl = buildPlatformUrl(platform as Platform, url);
        return NextResponse.redirect(redirectUrl, { status: 307 });
      }
    }
  }

  // Match /[username] - handled by page component
  return NextResponse.next();
}
