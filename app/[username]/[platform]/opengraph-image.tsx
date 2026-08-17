import { ImageResponse } from "next/og";
import { getProfileLink } from "@/lib/data";
import { getPlatformLabel, getFaviconUrl, normalizePlatform } from "@/lib/platforms";
import { loadGoogleFont } from "@/lib/og-font";

export const runtime = "nodejs";
export const alt = "Redirect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ username: string; platform: string }>;
}) {
  const { username, platform } = await params;
  const normalizedPlatform = normalizePlatform(platform);
  const label = getPlatformLabel(normalizedPlatform);
  const url = await getProfileLink(username, platform);
  const favicon = url ? getFaviconUrl(normalizedPlatform, url, 128) : "";

  const headingText = `@${username}`;
  const bodyText = [
    "Redirect",
    "Not found",
    "redirect",
    "to",
    label,
    "link not set up",
  ].join(" ");

  const [heading, body] = await Promise.all([
    loadGoogleFont("Inter", 600, headingText),
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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#181815",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6b6a67",
            marginBottom: 28,
          }}
        >
          {url ? "Redirect" : "Not found"}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontSize: 96,
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.05,
          }}
        >
          {headingText}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 36,
          }}
        >
          {favicon && (
            <img
              src={favicon}
              alt=""
              width={56}
              height={56}
              style={{ borderRadius: 12 }}
            />
          )}
          <div style={{ display: "flex", fontSize: 34, color: "#f2f1f0" }}>
            {url ? `to ${label}` : `${label} link not set up`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 64,
            left: 80,
            fontSize: 22,
            color: "#6b6a67",
          }}
        >
          redirect
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: heading, style: "normal", weight: 600 },
        { name: "Inter", data: body, style: "normal", weight: 500 },
      ],
    }
  );
}
