import { A } from "@solidjs/router";
import { For } from "solid-js";
import PageHero from "~/components/PageHero";
import Reveal from "~/components/Reveal";
import Seo from "~/components/Seo";
import { products } from "~/lib/configurator";
import { services, steps } from "~/lib/content";
import { waLink } from "~/lib/site";

export default function Layanan() {
  const hasConfigurator = (slug: string) => products.some(p => p.id === slug);

  return (
    <>
      <Seo
        path="/layanan"
        title="Layanan"
        description="Jasa pembuatan lemari aluminium, kusen & jendela, pintu kaca, kanopi, partisi, shower box, dan aquarium custom."
      />
      <PageHero
        eyebrow="Layanan"
        title={<>Dari rangka <span class="font-serif font-normal italic text-accent">sampai</span> kaca.</>}
        intro="Semua pekerjaan aluminium dan kaca kami kerjakan sendiri, dari pengukuran di lokasi sampai pemasangan."
      />

      <section class="mx-auto max-w-[1400px] px-5 md:px-10">
        <For each={services}>
          {(s, i) => (
            <Reveal>
              <article id={s.slug} class="grid scroll-mt-24 gap-6 border-t border-ink py-12 md:grid-cols-12 md:py-16">
                <span class="font-serif text-5xl italic text-accent md:col-span-2">0{i() + 1}</span>
                <div class="md:col-span-5">
                  <h2 class="font-display text-4xl font-bold tracking-tight md:text-5xl">{s.title}</h2>
                  <div class="mt-5 flex flex-wrap gap-2">
                    <For each={s.tags}>
                      {tag => <span class="rounded-full border border-line px-3 py-1 text-xs text-mute">{tag}</span>}
                    </For>
                  </div>
                </div>
                <div class="md:col-span-5">
                  <p class="text-lg leading-relaxed text-mute">{s.desc}</p>
                  <div class="mt-6 flex flex-wrap gap-3 text-sm font-medium">
                    <a
                      href={waLink(`Halo, saya mau tanya soal ${s.title.toLowerCase()}.`)}
                      target="_blank"
                      rel="noopener"
                      class="rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-accent"
                    >
                      Tanya harga ↗
                    </a>
                    {hasConfigurator(s.slug) && (
                      <A
                        href={`/desain?produk=${s.slug}`}
                        class="rounded-full border border-ink px-5 py-2.5 transition-colors hover:bg-ink hover:text-paper"
                      >
                        Desain 3D
                      </A>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          )}
        </For>
      </section>

      <section class="grain mt-16 bg-ink text-paper">
        <div class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 class="font-display text-5xl font-bold tracking-tight md:text-7xl">
              Cara <span class="font-serif font-normal italic text-accent">kerja</span>
            </h2>
          </Reveal>
          <ol class="mt-14 grid gap-10 md:grid-cols-4">
            <For each={steps}>
              {(step, i) => (
                <li>
                  <Reveal delay={i() * 100}>
                    <div class="border-t border-white/20 pt-6">
                      <span class="text-sm text-white/40">Langkah 0{i() + 1}</span>
                      <p class="mt-4 font-display text-2xl font-semibold">{step.title}</p>
                      <p class="mt-3 text-sm leading-relaxed text-white/60">{step.desc}</p>
                    </div>
                  </Reveal>
                </li>
              )}
            </For>
          </ol>
        </div>
      </section>
    </>
  );
}
