import { frameColorLabel, type FrameColor } from "../pricing";
import { optionsFrom, type ProductDef } from "../types";

type Aquarium = {
  panjang: number;
  lebar: number;
  tinggi: number;
  tutup: boolean;
  rak: boolean;
  warnaRak: FrameColor;
};

const STAND_H = 75;

// Rough glass thickness rule of thumb based on water height and tank length
export function glassThickness(tinggi: number, panjang: number) {
  const steps = [5, 8, 10, 12, 15];
  let i = tinggi <= 35 ? 0 : tinggi <= 50 ? 1 : tinggi <= 65 ? 2 : 3;
  if (panjang > 150) i++;
  return steps[Math.min(i, steps.length - 1)];
}

export const aquarium: ProductDef<Aquarium> = {
  id: "aquarium",
  name: "Aquarium",
  description: "Aquarium kaca ukuran custom, bisa sekalian rak aluminium.",
  laborPercent: 30,
  defaults: { panjang: 100, lebar: 40, tinggi: 50, tutup: true, rak: true, warnaRak: "hitam" },
  params: [
    { key: "panjang", label: "Panjang", type: "number", min: 30, max: 200, step: 5, unit: "cm" },
    { key: "lebar", label: "Lebar", type: "number", min: 20, max: 80, step: 5, unit: "cm" },
    { key: "tinggi", label: "Tinggi", type: "number", min: 20, max: 80, step: 5, unit: "cm" },
    { key: "tutup", label: "Pakai tutup kaca", type: "toggle" },
    { key: "rak", label: "Pakai rak / meja aluminium", type: "toggle" },
    { key: "warnaRak", label: "Warna rak", type: "select", options: optionsFrom(frameColorLabel) }
  ],
  build(b, v) {
    const { panjang: P, lebar: L, tinggi: T } = v;
    const mm = glassThickness(T, P);
    const g = mm / 10;
    const base = v.rak ? STAND_H : 0;

    if (v.rak) {
      const t = 4;
      const x = P / 2 - t / 2;
      const z = L / 2 - t / 2;
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.profile([t, STAND_H, t], [sx * x, STAND_H / 2, sz * z], v.warnaRak);
      for (const y of [t / 2, STAND_H - t / 2]) {
        for (const sz of [-1, 1]) b.profile([P - 2 * t, t, t], [0, y, sz * z], v.warnaRak);
        for (const sx of [-1, 1]) b.profile([t, t, L - 2 * t], [sx * x, y, 0], v.warnaRak);
      }
    }

    const glass = { mm };
    b.glass([P, g, L], [0, base + g / 2, 0], "bening", glass);
    for (const sz of [-1, 1]) b.glass([P, T, g], [0, base + T / 2, sz * (L / 2 - g / 2)], "bening", glass);
    for (const sx of [-1, 1]) b.glass([g, T, L - 2 * g], [sx * (P / 2 - g / 2), base + T / 2, 0], "bening", glass);
    if (v.tutup) b.glass([P - 2 * g, 0.5, L - 2 * g], [0, base + T - 1, 0], "bening");

    const waterH = T * 0.88 - g;
    b.decor([P - 2 * g - 0.2, waterH, L - 2 * g - 0.2], [0, base + g + waterH / 2, 0], "water");
  }
};
