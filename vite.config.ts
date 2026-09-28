import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    solidStart(),
    tailwindcss(),
    nitro({
      routeRules: {
        // Self-hosted fonts never change, let browsers cache them for a year
        "/fonts/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } }
      },
      // No fixed preset: Nitro auto-detects the platform (e.g. Vercel),
      // and falls back to the Bun server preset when built with Bun locally
      prerender: {
        // Static marketing pages are rendered to HTML at build time (good for SEO + speed)
        routes: ["/", "/layanan", "/portofolio", "/kontak", "/desain"],
        crawlLinks: true
      }
    })
  ]
});
