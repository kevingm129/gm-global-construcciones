import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/selector", destination: "/selector.html" }];
  },
};

export default nextConfig;
