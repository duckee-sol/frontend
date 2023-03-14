/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com', 'static.duckee.xyz'],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { subsets: ['latin'] },
      },
    ],
  },
};

module.exports = nextConfig;
