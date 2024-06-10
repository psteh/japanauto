/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.japanauto.io';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${API_URL}/auth/:path*`,
      },
      {
        source: '/auctions/:path*',
        destination: `${API_URL}/auctions/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '8.ajes.com',
      },
    ],
  },
};

export default nextConfig;
