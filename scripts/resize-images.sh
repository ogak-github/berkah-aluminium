#!/usr/bin/env bash
# Generate responsive variants (name-480.webp, name-800.webp, name-1200.webp) for portfolio photos.
# Re-run after adding or replacing a photo in public/portofolio. Requires ImageMagick 7 (`magick`).
set -euo pipefail
cd "$(dirname "$0")/../public/portofolio"

for src in *.webp; do
  # Skip previously generated variants
  [[ "$src" =~ -[0-9]+\.webp$ ]] && continue
  name="${src%.webp}"
  for w in 480 800 1200; do
    # ">" never upscales, so a narrower original is kept at its own size
    magick "$src" -resize "${w}x>" -strip -quality 75 "${name}-${w}.webp"
  done
  echo "resized $src"
done
