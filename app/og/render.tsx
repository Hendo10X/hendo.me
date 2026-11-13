import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared config + renderer for all Open Graph images.
// Paper card, ink Geist text, no gradients — matches the site.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#fdfdfc"; // paper
const FG = "#111111"; // ink
const MUTED = "#6b7280"; // muted

export async function renderOG({
  title,
  subtitle,
  titleSize = 96,
}: {
  title: string;
  subtitle: string;
  titleSize?: number;
}) {
  // Literal process.cwd() paths so @vercel/nft traces the fonts into
  // the serverless bundle at build time.
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "app/og/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "app/og/Geist-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          padding: "80px",
          fontFamily: "Geist",
        }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 400,
            color: MUTED,
            letterSpacing: "0.01em",
          }}>
          hendo.buzz
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              color: FG,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}>
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 400,
              color: MUTED,
              marginTop: 24,
              maxWidth: 800,
              lineHeight: 1.35,
            }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
