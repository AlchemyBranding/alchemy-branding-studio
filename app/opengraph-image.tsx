import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt =
  "Alchemy Branding Studio — brand strategy, design and animation for ambitious businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#191919",
          color: "#FFFFFF",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            color: "#FE6D4C",
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: 4,
            fontWeight: 700,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            fontSize: 84,
            lineHeight: 1.05,
            fontWeight: 500,
            maxWidth: 960,
            letterSpacing: "-0.02em",
          }}
        >
          Brand strategy, design and{" "}
          <span style={{ color: "#FAF8F7", fontStyle: "italic" }}>
            animation
          </span>{" "}
          for ambitious businesses.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span>alchemybranding.studio</span>
          <span
            style={{
              padding: "10px 20px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 999,
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Book a call
          </span>
        </div>
      </div>
    ),
    size,
  );
}
