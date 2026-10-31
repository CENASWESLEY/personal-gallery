import type { NextConfig } from "next";

/** Produces a portable static gallery; no server or image proxy is required. */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
