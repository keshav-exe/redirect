import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#181815",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg
          width="132"
          height="132"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
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
      </div>
    ),
    size
  );
}
