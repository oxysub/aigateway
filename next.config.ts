import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Use webpack for production builds (shared hosting often symlinks node_modules;
  // Turbopack fails with "Symlink node_modules is invalid" on Linux panels).
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd()),
    };
    return config;
  },
};

export default nextConfig;
