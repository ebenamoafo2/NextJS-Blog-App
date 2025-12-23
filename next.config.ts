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
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "cdn.pixabay.com",
        protocol: "https",
        port: "",
        pathname: "/**",
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
