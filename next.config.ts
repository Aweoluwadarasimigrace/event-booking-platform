import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: __dirname, // ✅ fixes multiple lockfile/root confusion
};

export default nextConfig;
