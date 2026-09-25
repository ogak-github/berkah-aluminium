import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    solidStart(),
    tailwindcss(),
    nitro({
      // Production server runs on Bun
      preset: "bun",
      prerender: {
        // Static marketing pages are rendered to HTML at build time (good for SEO + speed)
        routes: ["/", "/layanan", "/portofolio", "/kontak", "/desain"],
        crawlLinks: true
      }
    })
  ]
});
