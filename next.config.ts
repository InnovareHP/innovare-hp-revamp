import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    domains: [
      "media.licdn.com",
      "images.unsplash.com",
      "xxldcsnneqmdwebkxgnl.supabase.co",
    ],
  },
};

export default nextConfig;
