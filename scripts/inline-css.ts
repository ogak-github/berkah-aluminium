// Post-build step: inline the global stylesheet into prerendered HTML pages.
// Removes the HTML -> CSS request chain that delays first paint on slow mobile networks.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Nitro writes static files here for the Vercel preset and the local Bun preset respectively
const publicDirs = [".vercel/output/static", ".output/public"].filter(existsSync);

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name: string) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name.startsWith("_") ? [] : htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });

const linkPattern = /<link href="(\/_build\/assets\/[^"]+\.css)" rel="stylesheet" ?\/?>/g;

let inlined = 0;
for (const dir of publicDirs) {
  for (const file of htmlFiles(dir)) {
    const html = readFileSync(file, "utf8");
    const out = html.replace(linkPattern, (tag: string, href: string) => {
      const cssPath = join(dir, href);
      if (!existsSync(cssPath)) return tag;
      inlined++;
      // "</style" can't appear in Tailwind output, but guard against breaking out of the tag anyway
      return `<style>${readFileSync(cssPath, "utf8").replaceAll("</style", "<\\/style")}</style>`;
    });
    if (out !== html) writeFileSync(file, out);
  }
}

console.log(`[inline-css] inlined ${inlined} stylesheet(s) in ${publicDirs.join(", ") || "no output dir"}`);
if (inlined === 0) throw new Error("[inline-css] no stylesheet was inlined, check the build output layout");
