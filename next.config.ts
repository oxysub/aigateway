import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Reduce build-time memory on shared hosting.
  productionBrowserSourceMaps: false,

  experimental: {
    workerThreads: false,
    cpus: 1,
    webpackMemoryOptimizations: true,
  },

  webpack: (config, { dev }) => {
    config.parallelism = 1;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd()),
    };

    // Disable webpack disk cache during production builds to save RAM.
    if (!dev) {
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;
