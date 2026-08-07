import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 800],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: '**.shopify.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.actus-interior.com' },
      { protocol: 'https', hostname: '**.masterwal.jp' },
      { protocol: 'https', hostname: '**.air-r.jp' },
      { protocol: 'https', hostname: '**.flymee.jp' },
      { protocol: 'https', hostname: '**.yahoofs.jp' },
      { protocol: 'https', hostname: '**.imgvc.com' },
      { protocol: 'https', hostname: '**.valuecommerce.com' },
      { protocol: 'https', hostname: '**.lavita.co.jp' },
      { protocol: 'https', hostname: '**.lavita-onlineshop.jp' },
      { protocol: 'http', hostname: '**.actus-interior.com' },
      { protocol: 'http', hostname: '**.masterwal.jp' },
      { protocol: 'http', hostname: '**.air-r.jp' },
      { protocol: 'http', hostname: '**.flymee.jp' },
    ],
  },
};

export default nextConfig;
