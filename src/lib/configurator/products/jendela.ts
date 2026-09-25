import type { Builder } from "../builder";
import { frameColorLabel, glassLabel, type FrameColor, type GlassType } from "../pricing";
import { optionsFrom, type ProductDef } from "../types";

type Tipe = "geser" | "casement" | "mati";

type Jendela = {
  lebar: number;
  tinggi: number;
  panel: number;
  tipe: Tipe;
  boven: boolean;
  warna: FrameColor;
  kaca: GlassType;
};

const T = 4; // outer frame face width
const DEPTH = 7; // outer frame depth
const S = 3; // sash profile width
const BOVEN_H = 35;

export const jendela: ProductDef<Jendela> = {
  id: "jendela",
  name: "Jendela",
  description: "Kusen & jendela aluminium: geser, casement (buka), atau kaca mati.",
  laborPercent: 30,
  defaults: { lebar: 150, tinggi: 120, panel: 2, tipe: "geser", boven: true, warna: "silver", kaca: "bening" },
  params: [
    { key: "lebar", label: "Lebar", type: "number", min: 40, max: 300, step: 5, unit: "cm" },
    { key: "tinggi", label: "Tinggi (tanpa boven)", type: "number", min: 40, max: 200, step: 5, unit: "cm" },
    { key: "panel", label: "Jumlah daun", type: "number", min: 1, max: 4, step: 1 },
    {
      key: "tipe",
      label: "Tipe bukaan",
      type: "select",
      options: [
        { value: "geser", label: "Geser (sliding)" },
        { value: "casement", label: "Casement (buka keluar)" },
        { value: "mati", label: "Kaca mati" }
      ]
    },
    { key: "boven", label: "Pakai boven (ventilasi atas)", type: "toggle" },
    { key: "warna", label: "Warna aluminium", type: "select", options: optionsFrom(frameColorLabel) },
    { key: "kaca", label: "Jenis kaca", type: "select", options: optionsFrom(glassLabel) }
  ],
  build(b, v) {
    const { lebar: W, tinggi: H, panel: n, warna } = v;
    const Htot = H + (v.boven ? BOVEN_H : 0);

    // Outer frame
    b.profile([W, T, DEPTH], [0, T / 2, 0], warna);
    b.profile([W, T, DEPTH], [0, Htot - T / 2, 0], warna);
    for (const sx of [-1, 1]) b.profile([T, Htot - 2 * T, DEPTH], [sx * (W / 2 - T / 2), Htot / 2, 0], warna);

    const innerW = W - 2 * T;
    const y0 = T;
    const y1 = v.boven ? H - T / 2 : H - T;
    const areaH = y1 - y0;
    const cy = (y0 + y1) / 2;

    if (v.boven) {
      b.profile([innerW, T, DEPTH], [0, H, 0], warna);
      const bh = Htot - T - (H + T / 2);
      fixedPanes(b, v, innerW, bh, H + T / 2 + bh / 2);
    }

    const sw = innerW / n;
    if (v.tipe === "mati") {
      fixedPanes(b, v, innerW, areaH, cy);
    } else if (v.tipe === "casement") {
      for (let i = 0; i < n; i++) {
        const cx = -innerW / 2 + (i + 0.5) * sw;
        sash(b, v, cx, sw - 0.4, areaH - 0.4, cy, 0);
        const hx = cx + (i % 2 === 0 ? 1 : -1) * (sw / 2 - S - 3);
        b.decor([1.5, 12, 1.5], [hx, cy, 3.5], "chrome");
      }
      b.hardware("engsel", n * 2);
      b.hardware("handle", n);
    } else {
      // Sliding sashes overlap a little and alternate between two tracks
      for (let i = 0; i < n; i++) {
        const cx = -innerW / 2 + (i + 0.5) * sw;
        sash(b, v, cx, sw + (n > 1 ? 3 : 0), areaH - 0.4, cy, i % 2 === 0 ? -1.8 : 1.8);
      }
      b.hardware("roller", n * 2);
      b.hardware("kunci", Math.ceil(n / 2));
    }
  }
};

function sash(b: Builder, v: Jendela, cx: number, w: number, h: number, cy: number, z: number) {
  const d = 3.5;
  b.profile([S, h, d], [cx - w / 2 + S / 2, cy, z], v.warna);
  b.profile([S, h, d], [cx + w / 2 - S / 2, cy, z], v.warna);
  b.profile([w - 2 * S, S, d], [cx, cy - h / 2 + S / 2, z], v.warna);
  b.profile([w - 2 * S, S, d], [cx, cy + h / 2 - S / 2, z], v.warna);
  b.glass([w - 2 * S, h - 2 * S, 0.5], [cx, cy, z], v.kaca);
}

// Fixed glass divided by vertical mullions, one pane per sash column
function fixedPanes(b: Builder, v: Jendela, innerW: number, h: number, cy: number) {
  const n = v.panel;
  const pw = (innerW - (n - 1) * T) / n;
  for (let i = 0; i < n; i++) {
    const cx = -innerW / 2 + pw / 2 + i * (pw + T);
    b.glass([pw, h, 0.5], [cx, cy, 0], v.kaca);
    if (i < n - 1) b.profile([T, h, DEPTH], [cx + pw / 2 + T / 2, cy, 0], v.warna);
  }
}
