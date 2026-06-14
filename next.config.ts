import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // FastComet/CloudLinux limits processes — default Next.js spawns many workers.
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // Webpack build (avoids Turbopack symlink issues on shared hosting).
  webpack: (config) => {
    config.parallelism = 1;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd()),
    };
    return config;
  },
};

export default nextConfig;
