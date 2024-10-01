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
  output: 'standalone'
};

module.exports = nextConfig;
