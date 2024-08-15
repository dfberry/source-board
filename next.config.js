/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  // distDir: "build",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  serverRuntimeConfig: {
    port: 80,
  },
};

module.exports = nextConfig;
