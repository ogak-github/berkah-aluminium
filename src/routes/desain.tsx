import { useSearchParams } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { createMemo, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import Seo from "~/components/Seo";
import { buildProduct, findProduct, products, summarize, type ParamDef, type Values } from "~/lib/configurator";
import { formatRupiah } from "~/lib/configurator/pricing";
import { waLink } from "~/lib/site";

// WebGL only runs in the browser
const Viewer = clientOnly(() => import("~/components/configurator/Viewer"));

export default function Desain() {
  const [search, setSearch] = useSearchParams<{ produk?: string }>();
  const product = createMemo(() => findProduct(search.produk));

  // Keep each product's values separately so switching tabs doesn't lose edits
  const [values, setValues] = createStore<Record<string, Values>>(
    Object.fromEntries(products.map(p => [p.id, { ...p.defaults }]))
  );
  const current = () => values[product().id];
  const setParam = (key: string, value: Values[string]) => setValues(product().id, key, value);

  const [resetKey, setResetKey] = createSignal(0);
  const [showDetail, setShowDetail] = createSignal(false);

  const estimate = createMemo(() =>
    buildProduct(product(), { ...current() }, false).estimate(product().laborPercent)
  );

  const waText = () =>
    [
      `Halo, saya sudah mendesain *${product().name}* di website:`,
      ...summarize(product(), current()).map(l => `• ${l}`),
      "",
      `Estimasi website: ${formatRupiah(estimate().low)} – ${formatRupiah(estimate().high)}`,
      "Mohon info harga pastinya. Terima kasih."
    ].join("\n");

  return (
    <>
      <Seo
        path="/desain"
        title="Desain 3D"
        description="Rancang sendiri lemari, jendela, kanopi, atau aquarium aluminium dalam 3D, lengkap dengan estimasi harga."
      />

      <section class="mx-auto max-w-[1400px] px-5 pb-16 pt-10 md:px-10 md:pt-14">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-mute">
              <span class="h-px w-8 bg-ink" />
              Desainer 3D
            </p>
            <h1 class="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
              Rancang <span class="font-serif font-normal italic text-accent">sendiri.</span>
            </h1>
          </div>
          <p class="max-w-sm text-mute">Atur ukuran dan material, putar modelnya, lalu kirim desainnya ke kami.</p>
        </div>

        <div class="mt-10 flex gap-2 overflow-x-auto border-t border-ink pb-1 pt-6" role="tablist">
          <For each={products}>
            {p => (
              <button
                role="tab"
                aria-selected={product().id === p.id}
                onClick={() => setSearch({ produk: p.id })}
                class="shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors"
                classList={{
                  "border-ink bg-ink text-paper": product().id === p.id,
                  "border-line hover:border-ink": product().id !== p.id
                }}
              >
                {p.name}
              </button>
            )}
          </For>
        </div>

        <div class="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div class="relative h-[55vh] min-h-[360px] overflow-hidden rounded-2xl bg-paper-dark lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <Viewer
              product={product()}
              values={current()}
              resetKey={resetKey()}
              fallback={<div class="grid h-full place-items-center text-sm text-mute">Memuat 3D…</div>}
            />
            <button
              onClick={() => setResetKey(k => k + 1)}
              class="absolute right-4 top-4 rounded-full bg-paper px-4 py-2 text-xs font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              Reset kamera
            </button>
            <p class="pointer-events-none absolute bottom-4 left-4 text-xs text-mute">
              Geser untuk memutar · scroll / cubit untuk zoom
            </p>
          </div>

          <aside class="space-y-5">
            <div class="rounded-2xl border border-line p-6">
              <h2 class="font-display text-2xl font-bold">{product().name}</h2>
              <p class="mt-1 text-sm text-mute">{product().description}</p>
              <div class="mt-6 space-y-5">
                <For each={product().params}>
                  {param => <ParamControl param={param} value={current()[param.key]} onChange={v => setParam(param.key, v)} />}
                </For>
              </div>
              <button
                onClick={() => setValues(product().id, { ...product().defaults })}
                class="mt-6 text-sm font-medium text-mute underline-offset-4 hover:text-ink hover:underline"
              >
                Kembalikan ke default
              </button>
            </div>

            <div class="grain overflow-hidden rounded-2xl bg-ink p-6 text-paper">
              <p class="text-xs font-medium uppercase tracking-[0.2em] text-white/40">Estimasi harga terpasang</p>
              <p class="mt-3 font-display text-2xl font-bold leading-tight">
                {formatRupiah(estimate().low)} – {formatRupiah(estimate().high)}
              </p>
              <p class="mt-3 text-xs leading-relaxed text-white/50">
                Estimasi kasar, belum termasuk ongkos kirim & kondisi lokasi. Harga final setelah survei.
              </p>

              <button onClick={() => setShowDetail(!showDetail())} class="mt-4 text-sm font-medium text-accent underline-offset-4 hover:underline">
                {showDetail() ? "Sembunyikan rincian" : "Lihat rincian material"}
              </button>
              <Show when={showDetail()}>
                <table class="mt-3 w-full text-xs">
                  <tbody>
                    <For each={estimate().lines}>
                      {l => (
                        <tr class="border-t border-white/10">
                          <td class="py-1.5 pr-2">{l.label}</td>
                          <td class="whitespace-nowrap py-1.5 text-right">
                            {l.qty.toLocaleString("id-ID")} {l.unit}
                          </td>
                        </tr>
                      )}
                    </For>
                    <tr class="border-t border-white/10">
                      <td class="py-1.5">Material</td>
                      <td class="py-1.5 text-right">{formatRupiah(estimate().material)}</td>
                    </tr>
                    <tr class="border-t border-white/10">
                      <td class="py-1.5">Jasa pembuatan & pasang</td>
                      <td class="py-1.5 text-right">{formatRupiah(estimate().labor)}</td>
                    </tr>
                  </tbody>
                </table>
              </Show>

              <a
                href={waLink(waText())}
                target="_blank"
                rel="noopener"
                class="mt-6 block rounded-full bg-accent px-5 py-3.5 text-center font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Kirim desain ke WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ParamControl(props: { param: ParamDef; value: Values[string]; onChange: (v: Values[string]) => void }) {
  const id = () => `param-${props.param.key}`;
  return (
    <Switch>
      <Match when={props.param.type === "number" && props.param}>
        {p => (
          <div>
            <div class="flex items-center justify-between text-sm">
              <label for={id()} class="font-medium">{p().label}</label>
              <span class="flex items-center gap-1">
                <input
                  type="number"
                  min={p().min}
                  max={p().max}
                  step={p().step}
                  value={props.value as number}
                  onChange={e => props.onChange(clamp(Number(e.currentTarget.value), p().min, p().max))}
                  class="w-16 border-0 border-b border-line bg-transparent px-1 py-0.5 text-right outline-none focus:border-accent"
                  aria-label={p().label}
                />
                <span class="w-6 text-mute">{p().unit}</span>
              </span>
            </div>
            <input
              id={id()}
              type="range"
              min={p().min}
              max={p().max}
              step={p().step}
              value={props.value as number}
              onInput={e => props.onChange(Number(e.currentTarget.value))}
              class="mt-2 w-full accent-accent"
            />
          </div>
        )}
      </Match>
      <Match when={props.param.type === "select" && props.param}>
        {p => (
          <label class="block text-sm font-medium">
            {p().label}
            <select
              value={props.value as string}
              onChange={e => props.onChange(e.currentTarget.value)}
              class="mt-2 w-full rounded-full border border-line bg-transparent px-4 py-2.5 font-normal outline-none focus:border-ink"
            >
              <For each={p().options}>{o => <option value={o.value}>{o.label}</option>}</For>
            </select>
          </label>
        )}
      </Match>
      <Match when={props.param.type === "toggle"}>
        <label class="flex items-center justify-between text-sm font-medium">
          {props.param.label}
          <input
            type="checkbox"
            checked={props.value as boolean}
            onChange={e => props.onChange(e.currentTarget.checked)}
            class="h-4 w-4 accent-accent"
          />
        </label>
      </Match>
    </Switch>
  );
}

const clamp = (n: number, min: number, max: number) => (Number.isNaN(n) ? min : Math.min(max, Math.max(min, n)));
