import { Builder } from "./builder";
import type { ProductDef, Values } from "./types";
import { lemari } from "./products/lemari";
import { jendela } from "./products/jendela";
import { kanopi } from "./products/kanopi";
import { aquarium } from "./products/aquarium";

export const products: ProductDef[] = [lemari, jendela, kanopi, aquarium];

export const findProduct = (id?: string) => products.find(p => p.id === id) ?? products[0];

export function buildProduct(product: ProductDef, values: Values, render: boolean) {
  const b = new Builder(render);
  product.build(b, values);
  return b;
}

export function summarize(product: ProductDef, values: Values) {
  return product.params.map(p => {
    const v = values[p.key];
    if (p.type === "number") return `${p.label}: ${v}${p.unit ? " " + p.unit : ""}`;
    if (p.type === "toggle") return `${p.label}: ${v ? "Ya" : "Tidak"}`;
    return `${p.label}: ${p.options.find(o => o.value === v)?.label ?? v}`;
  });
}

export type { ProductDef, Values, ParamDef } from "./types";
