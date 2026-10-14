import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Self-contained server bundle for the Docker image.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
