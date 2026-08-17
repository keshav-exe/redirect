import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/data";
import { PLATFORM_LABELS, getFaviconUrl } from "@/lib/platforms";
import { loadGoogleFont } from "@/lib/og-font";

export const runtime = "nodejs";
export const alt = "Redirect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfile(username);

  const headingText = `@${username}`;
  const links = profile?.links ?? [];
  const subtitle = profile
    ? links.length > 0
      ? `${links.length} destination${links.length === 1 ? "" : "s"}`
      : "No links yet"
    : "Not claimed yet";

  const bodyText = [
    subtitle,
    "redirect",
    "Choose a platform",
    ...links.map((l) => PLATFORM_LABELS[l.platform] || l.platform),
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
          {subtitle}
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

        {links.length > 0 && (
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {links.slice(0, 6).map((link) => {
              const favicon = getFaviconUrl(link.platform, link.url, 64);
              return favicon ? (
                <img
                  key={link.platform}
                  src={favicon}
                  alt=""
                  width={48}
                  height={48}
                  style={{ borderRadius: 10 }}
                />
              ) : null;
            })}
          </div>
        )}

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
