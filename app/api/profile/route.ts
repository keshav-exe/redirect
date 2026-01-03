import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  saveProfile,
  canEditProfile,
  getProfile,
  getProfileByUserId,
} from "@/lib/data";
import type { Profile } from "@/lib/types";

export const runtime = "nodejs";

// Username validation
function isValidUsername(username: string): boolean {
  // Alphanumeric and hyphens, 3-20 chars
  return /^[a-z0-9-]{3,20}$/.test(username.toLowerCase());
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { username, links, isEdit } = body;

    // Basic validation
    if (!username || !links || links.length === 0) {
      return NextResponse.json(
        { error: "Username and at least one link required" },
        { status: 400 }
      );
    }

    const normalizedUsername = username.trim().toLowerCase();

    // Validate username format
    if (!isValidUsername(normalizedUsername)) {
      return NextResponse.json(
        {
          error:
            "Username must be 3-20 characters, alphanumeric with hyphens only",
        },
        { status: 400 }
      );
    }

    // Check if editing existing profile
    const existingProfile = await getProfile(normalizedUsername);
    if (existingProfile) {
      if (!isEdit) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }
      // Check ownership
      if (!(await canEditProfile(normalizedUsername, session.user.id))) {
        return NextResponse.json(
          { error: "You don't have permission to edit this profile" },
          { status: 403 }
        );
      }
    } else if (isEdit) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Validate URLs
    for (const link of links) {
      if (!link.url || !link.platform) {
        return NextResponse.json(
          { error: "All links must have platform and URL" },
          { status: 400 }
        );
      }
      try {
        new URL(link.url);
      } catch {
        return NextResponse.json(
          { error: `Invalid URL: ${link.url}` },
          { status: 400 }
        );
      }
    }

    // Check for duplicate platforms
    const platforms = links.map((l: { platform: string }) => l.platform);
    if (new Set(platforms).size !== platforms.length) {
      return NextResponse.json(
        { error: "Duplicate platforms not allowed" },
        { status: 400 }
      );
    }

    const profile: Profile = {
      username: normalizedUsername,
      links,
      userId: session.user.id,
      createdAt: existingProfile?.createdAt,
    };

    await saveProfile(profile);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile save error:", error);
    return NextResponse.json(
      {
        error: "Failed to save profile",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (username) {
      const profile = await getProfile(username);
      if (!profile) {
        return NextResponse.json(
          { error: "Profile not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ profile });
    }

    // Get user's own profile
    const profile = await getProfileByUserId(session.user.id);
    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Profile get error:", error);
    return NextResponse.json(
      { error: "Failed to get profile" },
      { status: 500 }
    );
  }
}
