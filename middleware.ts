import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export async function middleware(request: NextRequest) {
  // Middleware just passes through - Auth and Redis lookup happen in page components
  // (redis package requires Node.js runtime, middleware runs on Edge)
  return NextResponse.next();
}
