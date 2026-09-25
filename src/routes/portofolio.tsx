import { createMemo, createSignal, For } from "solid-js";
import PageHero from "~/components/PageHero";
import ProjectCard from "~/components/ProjectCard";
import Seo from "~/components/Seo";
import { projects } from "~/lib/content";

export default function Portofolio() {
  const categories = ["Semua", ...new Set(projects.map(p => p.category))];
  const [active, setActive] = createSignal("Semua");
  const filtered = createMemo(() =>
    active() === "Semua" ? projects : projects.filter(p => p.category === active())
  );

  return (
    <>
      <Seo
        path="/portofolio"
        title="Portofolio"
        description="Galeri hasil pekerjaan Berkah Aluminium: lemari, kanopi, jendela, pintu kaca, partisi, dan aquarium."
      />
      <PageHero
        eyebrow="Portofolio"
        title={<>Karya yang <span class="font-serif font-normal italic text-accent">sudah</span> berdiri.</>}
        intro="Hasil pekerjaan kami untuk rumah, toko, dan kantor."
      />

      <section class="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <div class="flex flex-wrap gap-2 border-t border-ink pt-8">
          <For each={categories}>
            {c => (
              <button
                onClick={() => setActive(c)}
                class="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                classList={{
                  "border-ink bg-ink text-paper": active() === c,
                  "border-line hover:border-ink": active() !== c
                }}
              >
                {c}
                <sup class="ml-1 text-[10px] opacity-60">
                  {c === "Semua" ? projects.length : projects.filter(p => p.category === c).length}
                </sup>
              </button>
            )}
          </For>
        </div>
        {/* Alternating tall/wide cards for an editorial rhythm */}
        <div class="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <For each={filtered()}>
            {(p, i) => (
              <div classList={{ "lg:mt-24": i() % 3 === 1 }}>
                <ProjectCard project={p} tall={i() % 2 === 1} />
              </div>
            )}
          </For>
        </div>
      </section>
    </>
  );
}
