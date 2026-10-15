import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Fully static site — export to `out/` for Cloudflare Pages (static assets,
  // no Worker runtime). Every route is prerendered.
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { unoptimized: true },
  experimental: {
    // Two root layouts (route groups (ro) and (en)) so <html lang> differs per
    // language; with several root layouts the 404 for unmatched URLs must be
    // app/global-not-found.tsx, which is still behind this flag in Next 16.
    globalNotFound: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
