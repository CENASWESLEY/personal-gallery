import type { NextConfig } from "next";

/** Produces a portable static gallery; no server or image proxy is required. */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
