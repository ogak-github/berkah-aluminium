import * as THREE from "three";
import {
  pricing,
  frameColorLabel,
  glassLabel,
  roofLabel,
  hardwareLabel,
  roundPrice,
  type FrameColor,
  type GlassType,
  type RoofType,
  type ProfileKind,
  type HardwareKey
} from "./pricing";

// All builder units are centimeters; the root group is scaled to meters.
export type Vec3 = [number, number, number];

export type BomLine = {
  key: string;
  label: string;
  qty: number;
  unit: "m" | "m²" | "pcs";
  unitPrice: number;
};

export type Estimate = {
  lines: BomLine[];
  material: number;
  labor: number;
  low: number;
  high: number;
};

type DecorKind = "wall" | "water" | "chrome";

const frameHex: Record<FrameColor, number> = {
  silver: 0xc9ccd1,
  hitam: 0x2b2b2e,
  coklat: 0x5a3b28,
  champagne: 0xcdb88f,
  woodgrain: 0x8a5a36
};

const unitBox = new THREE.BoxGeometry(1, 1, 1);

export class Builder {
  readonly root = new THREE.Group();
  private bom = new Map<string, BomLine>();
  private materials = new Map<string, THREE.Material>();

  constructor(private readonly render: boolean) {
    this.root.scale.setScalar(0.01);
  }

  profile(size: Vec3, pos: Vec3, color: FrameColor, opts: { kind?: ProfileKind; rot?: Vec3 } = {}) {
    const kind = opts.kind ?? "standar";
    const meters = Math.max(...size) / 100;
    this.add(
      `profile:${kind}:${color}`,
      `Profil aluminium ${kind} (${frameColorLabel[color]})`,
      meters,
      "m",
      pricing.profilePerMeter[kind] * pricing.finishFactor[color]
    );
    this.mesh(size, pos, opts.rot, `frame:${color}`, () => new THREE.MeshStandardMaterial({
      color: frameHex[color],
      metalness: color === "woodgrain" ? 0.2 : 0.85,
      roughness: color === "woodgrain" ? 0.7 : 0.35
    }));
  }

  glass(size: Vec3, pos: Vec3, type: GlassType, opts: { mm?: number; rot?: Vec3 } = {}) {
    const mm = opts.mm ?? 5;
    this.add(
      `glass:${type}:${mm}`,
      `Kaca ${glassLabel[type].toLowerCase()} ${mm} mm`,
      area(size),
      "m²",
      pricing.glassPerM2At5mm[type] * (mm / 5)
    );
    this.mesh(size, pos, opts.rot, `glass:${type}`, () => glassMaterial(type));
  }

  roof(size: Vec3, pos: Vec3, type: RoofType, rot?: Vec3) {
    this.add(`roof:${type}`, `Atap ${roofLabel[type].toLowerCase()}`, area(size), "m²", pricing.roofPerM2[type]);
    this.mesh(size, pos, rot, `roof:${type}`, () => {
      if (type === "kaca") return glassMaterial("bening");
      if (type === "alderon") return new THREE.MeshStandardMaterial({ color: 0xe8e6e1, roughness: 0.8 });
      return new THREE.MeshPhysicalMaterial({
        color: 0xb58a4c,
        transparent: true,
        opacity: 0.45,
        roughness: 0.3,
        depthWrite: false,
        side: THREE.DoubleSide
      });
    });
  }

  hardware(key: HardwareKey, qty: number) {
    this.add(`hw:${key}`, hardwareLabel[key], qty, "pcs", pricing.hardware[key]);
  }

  // Visual-only geometry that is not part of the bill of materials
  decor(size: Vec3, pos: Vec3, kind: DecorKind, rot?: Vec3) {
    this.mesh(size, pos, rot, `decor:${kind}`, () => {
      if (kind === "wall") return new THREE.MeshStandardMaterial({ color: 0xe9e4dc, roughness: 0.95 });
      if (kind === "water") {
        return new THREE.MeshPhysicalMaterial({
          color: 0x3d9bd1,
          transparent: true,
          opacity: 0.35,
          roughness: 0.1,
          depthWrite: false
        });
      }
      return new THREE.MeshStandardMaterial({ color: 0xdadde0, metalness: 1, roughness: 0.15 });
    });
  }

  estimate(laborPercent: number): Estimate {
    const lines = [...this.bom.values()].map(l => ({ ...l, qty: Math.round(l.qty * 100) / 100 }));
    const material = lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0);
    const labor = material * (laborPercent / 100);
    const total = material + labor;
    return {
      lines,
      material,
      labor,
      low: roundPrice(total * (1 - pricing.spread)),
      high: roundPrice(total * (1 + pricing.spread))
    };
  }

  dispose() {
    this.materials.forEach(m => m.dispose());
    this.materials.clear();
  }

  private add(key: string, label: string, qty: number, unit: BomLine["unit"], unitPrice: number) {
    const line = this.bom.get(key);
    if (line) line.qty += qty;
    else this.bom.set(key, { key, label, qty, unit, unitPrice });
  }

  private mesh(size: Vec3, pos: Vec3, rot: Vec3 | undefined, matKey: string, makeMat: () => THREE.Material) {
    if (!this.render) return;
    let mat = this.materials.get(matKey);
    if (!mat) {
      mat = makeMat();
      this.materials.set(matKey, mat);
    }
    const m = new THREE.Mesh(unitBox, mat);
    m.scale.set(...size);
    m.position.set(...pos);
    if (rot) m.rotation.set(...rot);
    this.root.add(m);
  }
}

// Area of a panel in m², using its two largest dimensions
const area = (size: Vec3) => {
  const [a, b] = [...size].sort((x, y) => y - x);
  return (a * b) / 10_000;
};

function glassMaterial(type: GlassType): THREE.Material {
  if (type === "cermin") {
    return new THREE.MeshStandardMaterial({ color: 0xe3e7ea, metalness: 1, roughness: 0.04 });
  }
  const look = {
    bening: { color: 0xdff0f2, opacity: 0.22, roughness: 0.05 },
    riben: { color: 0x2f3b42, opacity: 0.6, roughness: 0.08 },
    es: { color: 0xf4f7f8, opacity: 0.7, roughness: 0.8 }
  }[type];
  return new THREE.MeshPhysicalMaterial({
    ...look,
    transparent: true,
    metalness: 0,
    clearcoat: 1,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}
