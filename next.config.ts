import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Bindings in next dev, same as player. The bucket binding is marked remote in wrangler.jsonc, so dev reads the real one.
initOpenNextCloudflareForDev();

// Same shape as design; cacheComponents/partialPrefetching dropped since the adapter doesn't need them and the page is static.
const nextConfig: NextConfig = {
  // The build date, inlined wherever a page says when it was last put up. One number for the home and the memos.
  env: { BUILD_DATE: new Date().toISOString().slice(0, 10) },
  // Every doc is also markdown at its own URL plus .md; the handler lives under /md, same as docs.
  async rewrites() {
    return [{ source: "/:path*.md", destination: "/md/:path*" }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      // Markdown in content/ imports as a string, so the words ship inside the worker.
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
