import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [],
  },
  // Ensure the OG font files ship with the opengraph-image serverless functions.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./app/og/*.ttf"],
    "/works/opengraph-image": ["./app/og/*.ttf"],
    "/posts/opengraph-image": ["./app/og/*.ttf"],
  },
};

export default nextConfig;
