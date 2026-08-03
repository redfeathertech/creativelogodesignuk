import { ImageResponse } from "next/og";

/**
 * Social share card, generated at build time.
 * The live site has no OG image at all — shares render as a bare URL.
 */

export const alt = "Creative Logo Design — UK design, development & digital marketing agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(120deg, #07020f 0%, #2b143f 55%, #7f0450 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ff8ecf",
          }}
        >
          Creative Logo Design
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          Digital Marketing &amp; Web Design Agency
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "rgba(255,255,255,0.72)" }}>
          Branding · Web design · Development · Growth
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 26,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          creativelogodesign.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
