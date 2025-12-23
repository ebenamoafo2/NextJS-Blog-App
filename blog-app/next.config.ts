import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        // Only HTTPS images are allowed (HTTP is blocked for security)
        hostname: "images.pexels.com",
        protocol: "https",
        port: "",
        pathname: "/**", // pathname = URL path after hostname (/** = allow everything)
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
