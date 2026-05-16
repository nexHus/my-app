import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  turbopack: {},
};

export default nextConfig;
