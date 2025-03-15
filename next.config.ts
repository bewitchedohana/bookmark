import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      sourceMaps: true,
    },
  },
};

export default nextConfig;
