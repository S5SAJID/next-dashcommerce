import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For Demo Products
      { hostname: "cdn.dummyjson.com" }
    ]
  }
};

export default nextConfig;
