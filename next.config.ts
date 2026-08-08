import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A stray lockfile in the parent directory otherwise confuses root inference.
  turbopack: { root: path.resolve(import.meta.dirname) },

  images: {
    // Sources are already WebP; let Next serve AVIF where the browser supports it.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [64, 128, 256, 384],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Optimized assets are content-hashed by the pipeline's filenames.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
