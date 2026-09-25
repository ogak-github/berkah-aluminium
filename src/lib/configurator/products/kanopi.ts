import { frameColorLabel, roofLabel, type FrameColor, type RoofType } from "../pricing";
import { optionsFrom, type ProductDef } from "../types";

type Kanopi = {
  lebar: number;
  panjang: number;
  tinggi: number;
  kemiringan: number;
  tiang: number;
  atap: RoofType;
  warna: FrameColor;
};

const POST = 8; // hollow post size
const RAFTER_GAP = 70; // max spacing between rafters

export const kanopi: ProductDef<Kanopi> = {
  id: "kanopi",
  name: "Kanopi",
  description: "Kanopi carport / teras dengan rangka aluminium hollow.",
  laborPercent: 30,
  defaults: { lebar: 400, panjang: 300, tinggi: 260, kemiringan: 40, tiang: 2, atap: "polycarbonate", warna: "hitam" },
  params: [
    { key: "lebar", label: "Lebar (sepanjang dinding)", type: "number", min: 200, max: 800, step: 10, unit: "cm" },
    { key: "panjang", label: "Panjang (menjorok keluar)", type: "number", min: 150, max: 500, step: 10, unit: "cm" },
    { key: "tinggi", label: "Tinggi sisi depan", type: "number", min: 220, max: 320, step: 5, unit: "cm" },
    { key: "kemiringan", label: "Selisih tinggi (kemiringan)", type: "number", min: 20, max: 100, step: 5, unit: "cm" },
    { key: "tiang", label: "Jumlah tiang depan", type: "number", min: 0, max: 5, step: 1 },
    { key: "atap", label: "Jenis atap", type: "select", options: optionsFrom(roofLabel) },
    { key: "warna", label: "Warna rangka", type: "select", options: optionsFrom(frameColorLabel) }
  ],
  build(b, v) {
    const { lebar: W, panjang: P, tinggi: Hf, warna } = v;
    const Hb = Hf + v.kemiringan;
    const hollow = { kind: "hollow" as const };

    // Context wall the canopy is mounted on
    b.decor([W + 120, Hb + 80, 20], [0, (Hb + 80) / 2, -10], "wall");

    // Wall plate and front beam
    b.profile([W, 8, 6], [0, Hb - 4, 3], warna, hollow);
    b.profile([W, 10, 6], [0, Hf - 5, P], warna, hollow);

    // Front posts (0 = cantilever, wall-mounted only)
    for (let i = 0; i < v.tiang; i++) {
      const x = v.tiang === 1 ? 0 : -W / 2 + POST / 2 + (i * (W - POST)) / (v.tiang - 1);
      b.profile([POST, Hf - 10, POST], [x, (Hf - 10) / 2, P], warna, hollow);
    }

    // Sloped rafters from wall to front beam
    const slope = Math.atan2(Hb - Hf, P);
    const L = Math.hypot(P, Hb - Hf);
    const rafters = Math.ceil(W / RAFTER_GAP) + 1;
    const midY = (Hb + Hf) / 2 + 4;
    for (let i = 0; i < rafters; i++) {
      const x = -W / 2 + 2 + (i * (W - 4)) / (rafters - 1);
      b.profile([4, 8, L], [x, midY, P / 2], warna, { ...hollow, rot: [slope, 0, 0] });
    }

    b.roof([W + 10, 1, L + 15], [0, midY + 5, P / 2 + 5], v.atap, [slope, 0, 0]);
    b.hardware("dynabolt", v.tiang * 4 + rafters * 2);
  }
};
