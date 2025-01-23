import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  /* Add other config options here */
};

export default nextConfig;
