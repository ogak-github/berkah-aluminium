import type { Builder } from "./builder";

export type Values = Record<string, number | string | boolean>;

export type ParamDef =
  | { key: string; label: string; type: "number"; min: number; max: number; step: number; unit?: string }
  | { key: string; label: string; type: "select"; options: { value: string; label: string }[] }
  | { key: string; label: string; type: "toggle" };

export type ProductDef<V extends Values = any> = {
  id: string;
  name: string;
  description: string;
  params: ParamDef[];
  defaults: V;
  laborPercent: number;
  build: (b: Builder, v: V) => void;
};

export const optionsFrom = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));
