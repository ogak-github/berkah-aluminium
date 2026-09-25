// Price list used for the rough estimate in the configurator.
// TODO: adjust every number to the workshop's real prices.

export type FrameColor = "silver" | "hitam" | "coklat" | "champagne" | "woodgrain";
export type GlassType = "bening" | "riben" | "es" | "cermin";
export type RoofType = "polycarbonate" | "kaca" | "alderon";
export type ProfileKind = "standar" | "hollow";
export type HardwareKey = "handle" | "engsel" | "roller" | "kunci" | "dynabolt";

export const pricing = {
  // Rupiah per meter of aluminium profile
  profilePerMeter: { standar: 45_000, hollow: 85_000 } satisfies Record<ProfileKind, number>,
  // Multiplier for colored / textured finishes
  finishFactor: { silver: 1, hitam: 1.15, coklat: 1.15, champagne: 1.1, woodgrain: 1.3 } satisfies Record<FrameColor, number>,
  // Rupiah per m² for 5 mm glass; thicker glass scales linearly with thickness
  glassPerM2At5mm: { bening: 160_000, riben: 190_000, es: 220_000, cermin: 260_000 } satisfies Record<GlassType, number>,
  roofPerM2: { polycarbonate: 180_000, kaca: 650_000, alderon: 250_000 } satisfies Record<RoofType, number>,
  hardware: { handle: 35_000, engsel: 25_000, roller: 30_000, kunci: 60_000, dynabolt: 15_000 } satisfies Record<HardwareKey, number>,
  // Final price shown as a range: total ± spread
  spread: 0.15
};

export const frameColorLabel: Record<FrameColor, string> = {
  silver: "Silver",
  hitam: "Hitam",
  coklat: "Coklat",
  champagne: "Champagne",
  woodgrain: "Motif kayu"
};

export const glassLabel: Record<GlassType, string> = {
  bening: "Bening",
  riben: "Riben (gelap)",
  es: "Es / buram",
  cermin: "Cermin"
};

export const roofLabel: Record<RoofType, string> = {
  polycarbonate: "Polycarbonate",
  kaca: "Kaca tempered",
  alderon: "Alderon"
};

export const hardwareLabel: Record<HardwareKey, string> = {
  handle: "Handle",
  engsel: "Engsel",
  roller: "Roda / roller",
  kunci: "Kunci",
  dynabolt: "Baut & dynabolt"
};

export const formatRupiah = (n: number) =>
  "Rp " + Math.round(n).toLocaleString("id-ID");

// Round to the nearest Rp 10.000 so the estimate doesn't look falsely precise
export const roundPrice = (n: number) => Math.round(n / 10_000) * 10_000;
