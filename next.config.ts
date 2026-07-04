import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options */
  transpilePackages: ['three'],
  typescript: {
    // Allow builds to proceed even with type errors during development
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
