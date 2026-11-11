import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photographs and featured images are served from Sanity's image CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
