import { NextResponse } from "next/server";
import { saveProfile } from "@/lib/data";
import type { Profile } from "@/lib/types";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const profile: Profile = await request.json();

    // Basic validation
    if (!profile.username || !profile.links || profile.links.length === 0) {
      return NextResponse.json(
        { error: "Invalid profile data" },
        { status: 400 }
      );
    }

    // Validate URLs
    for (const link of profile.links) {
      try {
        new URL(link.url);
      } catch {
        return NextResponse.json(
          { error: `Invalid URL: ${link.url}` },
          { status: 400 }
        );
      }
    }

    await saveProfile(profile);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
