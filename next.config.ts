import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Bindings in next dev, same as player. The bucket binding is marked remote in wrangler.jsonc, so dev reads the real one.
initOpenNextCloudflareForDev();

// Same shape as design; cacheComponents/partialPrefetching dropped since the adapter doesn't need them and the page is static.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
