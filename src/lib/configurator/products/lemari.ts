import { frameColorLabel, glassLabel, type FrameColor, type GlassType } from "../pricing";
import { optionsFrom, type ProductDef } from "../types";

type Lemari = {
  lebar: number;
  tinggi: number;
  dalam: number;
  pintu: number;
  rak: number;
  warna: FrameColor;
  kaca: GlassType;
  kacaPintu: GlassType;
};

const T = 3; // frame profile thickness
const DOOR_T = 2.5; // door profile thickness
const PANE = 0.5; // glass thickness (visual)

export const lemari: ProductDef<Lemari> = {
  id: "lemari",
  name: "Lemari",
  description: "Lemari pakaian, lemari dapur, rak display, atau etalase.",
  laborPercent: 35,
  defaults: { lebar: 120, tinggi: 180, dalam: 50, pintu: 2, rak: 3, warna: "silver", kaca: "bening", kacaPintu: "bening" },
  params: [
    { key: "lebar", label: "Lebar", type: "number", min: 40, max: 240, step: 5, unit: "cm" },
    { key: "tinggi", label: "Tinggi", type: "number", min: 40, max: 220, step: 5, unit: "cm" },
    { key: "dalam", label: "Kedalaman", type: "number", min: 30, max: 70, step: 5, unit: "cm" },
    { key: "pintu", label: "Jumlah pintu", type: "number", min: 1, max: 4, step: 1 },
    { key: "rak", label: "Jumlah rak", type: "number", min: 0, max: 6, step: 1 },
    { key: "warna", label: "Warna aluminium", type: "select", options: optionsFrom(frameColorLabel) },
    { key: "kaca", label: "Kaca samping & belakang", type: "select", options: optionsFrom(glassLabel) },
    { key: "kacaPintu", label: "Kaca pintu", type: "select", options: optionsFrom(glassLabel) }
  ],
  build(b, v) {
    const { lebar: W, tinggi: H, dalam: D, warna } = v;
    const x = W / 2 - T / 2;
    const z = D / 2 - T / 2;

    // Corner posts
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.profile([T, H, T], [sx * x, H / 2, sz * z], warna);

    // Top & bottom rails
    for (const y of [T / 2, H - T / 2]) {
      for (const sz of [-1, 1]) b.profile([W - 2 * T, T, T], [0, y, sz * z], warna);
      for (const sx of [-1, 1]) b.profile([T, T, D - 2 * T], [sx * x, y, 0], warna);
    }

    // Top, bottom, side and back panels
    const innerW = W - 2 * T;
    const innerH = H - 2 * T;
    const innerD = D - 2 * T;
    for (const y of [T, H - T]) b.glass([innerW, PANE, innerD], [0, y, 0], v.kaca);
    for (const sx of [-1, 1]) b.glass([PANE, innerH, innerD], [sx * x, H / 2, 0], v.kaca);
    b.glass([innerW, innerH, PANE], [0, H / 2, -z], v.kaca);

    // Shelves, evenly spaced
    for (let i = 1; i <= v.rak; i++) {
      b.glass([innerW, PANE, innerD], [0, T + (i * innerH) / (v.rak + 1), 0], v.kaca);
    }

    // Overlay doors on the front
    const gap = 0.3;
    const dw = W / v.pintu - gap;
    const dh = H - gap * 2;
    const dz = D / 2 + DOOR_T / 2;
    for (let i = 0; i < v.pintu; i++) {
      const cx = -W / 2 + (i + 0.5) * (W / v.pintu);
      b.profile([DOOR_T, dh, DOOR_T], [cx - dw / 2 + DOOR_T / 2, H / 2, dz], warna);
      b.profile([DOOR_T, dh, DOOR_T], [cx + dw / 2 - DOOR_T / 2, H / 2, dz], warna);
      b.profile([dw - 2 * DOOR_T, DOOR_T, DOOR_T], [cx, gap + DOOR_T / 2, dz], warna);
      b.profile([dw - 2 * DOOR_T, DOOR_T, DOOR_T], [cx, H - gap - DOOR_T / 2, dz], warna);
      b.glass([dw - 2 * DOOR_T, dh - 2 * DOOR_T, PANE], [cx, H / 2, dz], v.kacaPintu);

      // Handle sits on the edge closest to the center line
      const handleRight = v.pintu === 1 || cx < 0 || (cx === 0 && i % 2 === 0);
      const hx = cx + (handleRight ? 1 : -1) * (dw / 2 - DOOR_T - 2);
      b.decor([1, Math.min(15, dh * 0.2), 1.5], [hx, H / 2, dz + DOOR_T / 2 + 1], "chrome");
    }
    b.hardware("handle", v.pintu);
    b.hardware("engsel", v.pintu * (H > 150 ? 3 : 2));
  }
};
