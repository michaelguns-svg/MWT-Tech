/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      // @sanity/workbench ships broken, un-transpiled TypeScript and is only
      // used by an optional Sanity feature we don't use — see sanity/workbench-stub.ts.
      "@sanity/workbench": "./sanity/workbench-stub.ts",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zql0rfjwszzixew9.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Or to allow all Vercel Storage blobs:
      // {
      //   protocol: 'https',
      //   hostname: '*.public.blob.vercel-storage.com',
      // },
    ],
  },
};

module.exports = nextConfig; // Use `export default nextConfig;` if using ES modules (.mjs)