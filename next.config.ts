import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;
