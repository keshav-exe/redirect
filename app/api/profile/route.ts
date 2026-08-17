import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  saveProfile,
  canEditProfile,
  getProfile,
  getProfileByUserId,
} from "@/lib/data";
import { AUTH_ERROR_CODES } from "@/lib/errors";
import { toOwnerProfile } from "@/lib/profile-response";
import type { Profile } from "@/lib/types";
import { validateRedirectUrl } from "@/lib/urls";

export const runtime = "nodejs";

function isValidUsername(username: string): boolean {
  return /^[a-z0-9-]{3,20}$/.test(username.toLowerCase());
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized", code: AUTH_ERROR_CODES.SESSION_EXPIRED },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { username, links, isEdit, adFree } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const validLinks = links || [];
    const normalizedUsername = username.trim().toLowerCase();

    if (!isValidUsername(normalizedUsername)) {
      return NextResponse.json(
        {
          error:
            "Username must be 3-20 characters, alphanumeric with hyphens only",
        },
        { status: 400 }
      );
    }

    const existingProfile = await getProfile(normalizedUsername);
    if (existingProfile) {
      if (!isEdit) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }
      if (!(await canEditProfile(normalizedUsername, session.user.id))) {
        return NextResponse.json(
          { error: "You don't have permission to edit this profile" },
          { status: 403 }
        );
      }
    } else if (isEdit) {
      return NextResponse.json(
        {
          error: "Your redirect account no longer exists.",
          code: AUTH_ERROR_CODES.ACCOUNT_NOT_FOUND,
        },
        { status: 404 }
      );
    }

    const sanitizedLinks: Profile["links"] = [];

    if (validLinks.length > 0) {
      for (const link of validLinks) {
        if (!link.url || !link.platform) {
          return NextResponse.json(
            { error: "All links must have platform and URL" },
            { status: 400 }
          );
        }

        const validated = validateRedirectUrl(link.url);
        if (!validated.ok) {
          return NextResponse.json(
            { error: `${validated.error}: ${link.url}` },
            { status: 400 }
          );
        }

        sanitizedLinks.push({
          platform: link.platform,
          url: validated.url,
        });
      }

      const platforms = sanitizedLinks.map((link) => link.platform);
      if (new Set(platforms).size !== platforms.length) {
        return NextResponse.json(
          { error: "Duplicate platforms not allowed" },
          { status: 400 }
        );
      }
    }

    const profile: Profile = {
      username: normalizedUsername,
      links: sanitizedLinks,
      userId: session.user.id,
      adFree: Boolean(adFree),
      createdAt: existingProfile?.createdAt,
    };

    await saveProfile(profile);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile save error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (
      errorMessage.includes("<!DOCTYPE html>") ||
      errorMessage.includes("Web server is down")
    ) {
      return NextResponse.json(
        {
          error:
            "Database server is temporarily unavailable. Please try again in a few minutes.",
        },
        { status: 503 }
      );
    }

    if (
      errorMessage.includes("schema cache") ||
      errorMessage.includes("connection issue")
    ) {
      return NextResponse.json(
        {
          error: errorMessage,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: errorMessage.includes("Failed to save profile")
          ? errorMessage
          : `Failed to save profile: ${errorMessage}`,
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized", code: AUTH_ERROR_CODES.SESSION_EXPIRED },
        { status: 401 }
      );
    }

    const profile = await getProfileByUserId(session.user.id);
    return NextResponse.json({
      profile: profile ? toOwnerProfile(profile) : null,
    });
  } catch (error) {
    console.error("Profile get error:", error);
    return NextResponse.json(
      { error: "Failed to get profile" },
      { status: 500 }
    );
  }
}
