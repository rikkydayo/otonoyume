/** @type {import('next').NextConfig} */
const nextConfig = {
  target: "serverless",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.microcms-assets.io'],
  },
}

module.exports = nextConfig
