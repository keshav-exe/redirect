import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/og-font";

export const runtime = "nodejs";
export const alt =
  "redirect · direct links to every social profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const headingText = "redirect";
  const bodyText = "Direct links to every social profile";

  const [heading, body] = await Promise.all([
    loadGoogleFont("Zen Dots", 400, headingText),
    loadGoogleFont("Inter", 500, bodyText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          backgroundColor: "#181815",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path
              d="M15 21h25l9 9-9 9"
              fill="none"
              stroke="#0284c7"
              strokeWidth="7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M15 43h12c7.18 0 13-5.82 13-13v-2"
              fill="none"
              stroke="#fff"
              strokeWidth="7"
              strokeLinecap="square"
            />
          </svg>
          <div
            style={{
              display: "flex",
              fontFamily: "Zen Dots",
              fontSize: 34,
              color: "#ffffff",
            }}
          >
            {headingText}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 860,
            marginTop: 112,
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: -3,
            lineHeight: 1.08,
            color: "#ffffff",
          }}
        >
          Direct links to every social profile.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 22,
            color: "#a8a7a5",
          }}
        >
          One URL per platform. No link-in-bio page in the way.
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 16,
            height: "100%",
            backgroundColor: "#0284c7",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Zen Dots", data: heading, style: "normal", weight: 400 },
        { name: "Inter", data: body, style: "normal", weight: 500 },
      ],
    }
  );
}
