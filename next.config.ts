import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Next.js 16 restricts optimizer quality values. Keep the intentionally
    // softer cinematic imagery at 70 while retaining the default quality.
    qualities: [70, 75],
  },
  // Keep local development scoped to this project even when a parent folder
  // contains an unrelated lockfile.
  turbopack: { root: process.cwd() },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
