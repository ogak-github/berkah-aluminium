import { A } from "@solidjs/router";
import { For } from "solid-js";
import Marquee from "~/components/Marquee";
import ProjectCard from "~/components/ProjectCard";
import Reveal from "~/components/Reveal";
import Seo, { LocalBusinessJsonLd } from "~/components/Seo";
import { projects, services, stats, steps, testimonials } from "~/lib/content";
import { site, waLink } from "~/lib/site";

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <LocalBusinessJsonLd />

      {/* Hero */}
      <section class="relative mx-auto max-w-[1400px] px-5 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
        <Reveal>
          <div class="flex flex-wrap items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.2em] text-mute">
            <span>Workshop aluminium & kaca</span>
            <span>{site.city} — Est. {site.since}</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 class="mt-10 font-display text-[clamp(3rem,10.5vw,10rem)] font-bold leading-[0.88] tracking-tighter">
            Kami bentuk{" "}
            <span class="font-serif font-normal italic tracking-normal text-accent">aluminium</span>
            <br class="hidden md:block" /> & kaca jadi{" "}
            <span class="font-serif font-normal italic tracking-normal">ruang</span> yang hidup.
          </h1>
        </Reveal>

        <div class="mt-14 grid items-end gap-10 md:grid-cols-12">
          <Reveal delay={200} class="md:col-span-5">
            <p class="text-lg leading-relaxed text-mute">
              Lemari, jendela, pintu kaca, kanopi, sampai aquarium. Dirancang sesuai ruangan Anda, dikerjakan tangan
              sendiri di workshop kami.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                class="rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-colors hover:bg-accent"
              >
                Mulai proyek ↗
              </a>
              <A
                href="/desain"
                class="rounded-full border border-ink px-7 py-3.5 font-medium transition-colors hover:bg-ink hover:text-paper"
              >
                Coba desain 3D
              </A>
            </div>
          </Reveal>

          <Reveal delay={300} class="flex justify-start md:col-span-7 md:justify-end">
            <A href="/desain" class="group relative grid h-36 w-36 place-items-center md:h-44 md:w-44" aria-label="Buka desainer 3D">
              <svg viewBox="0 0 200 200" class="absolute inset-0 animate-spin-slow">
                <defs>
                  <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text class="fill-ink font-sans text-[15px] font-medium uppercase tracking-[0.3em]">
                  <textPath href="#circle">Survei gratis ✦ Konsultasi gratis ✦ </textPath>
                </text>
              </svg>
              <span class="grid h-16 w-16 place-items-center rounded-full bg-accent text-2xl text-white transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </A>
          </Reveal>
        </div>
      </section>

      <Marquee items={services.map(s => s.title)} class="grain border-y border-ink bg-ink py-6 text-paper" />

      {/* Statement + stats */}
      <section class="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <Reveal class="md:col-span-3">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-mute">( Tentang kami )</p>
        </Reveal>
        <div class="md:col-span-9">
          <Reveal>
            <p class="font-display text-3xl font-medium leading-[1.2] tracking-tight md:text-5xl">
              Setiap rumah punya ukuran dan cerita sendiri. Karena itu kami tidak menjual produk jadi, tapi{" "}
              <span class="font-serif italic text-accent">merancang</span> tiap lemari, jendela, dan kanopi supaya pas
              di tempatnya.
            </p>
          </Reveal>
          <div class="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-8">
            <For each={stats}>
              {(s, i) => (
                <Reveal delay={i() * 100}>
                  <p class="font-display text-4xl font-bold md:text-6xl">{s.value}</p>
                  <p class="mt-2 text-sm text-mute">{s.label}</p>
                </Reveal>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section class="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div class="flex flex-wrap items-end justify-between gap-4 pb-10">
            <h2 class="font-display text-5xl font-bold tracking-tight md:text-7xl">
              Apa yang <span class="font-serif font-normal italic">kami buat</span>
            </h2>
            <A href="/layanan" class="text-sm font-medium underline-offset-4 hover:underline">Semua layanan ↗</A>
          </div>
        </Reveal>
        <ul class="border-t border-ink">
          <For each={services}>
            {(s, i) => (
              <li>
                <A
                  href={`/layanan#${s.slug}`}
                  class="group relative grid grid-cols-12 items-center gap-4 overflow-hidden border-b border-ink py-7 md:py-9"
                >
                  <span class="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  <span class="relative col-span-2 text-sm text-mute transition-colors group-hover:text-white md:col-span-1">
                    0{i() + 1}
                  </span>
                  <span class="relative col-span-8 font-display text-2xl font-semibold transition-all duration-500 group-hover:translate-x-3 group-hover:text-white md:col-span-5 md:text-4xl">
                    {s.title}
                  </span>
                  <span class="relative hidden text-sm leading-relaxed text-mute transition-colors group-hover:text-white/90 md:col-span-5 md:block">
                    {s.desc}
                  </span>
                  <span class="relative col-span-2 text-right text-2xl transition-all duration-500 group-hover:rotate-45 group-hover:text-white md:col-span-1">
                    ↗
                  </span>
                </A>
              </li>
            )}
          </For>
        </ul>
      </section>

      {/* Selected works — asymmetric grid */}
      <section class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <div class="flex flex-wrap items-end justify-between gap-4">
            <h2 class="font-display text-5xl font-bold tracking-tight md:text-7xl">
              Karya <span class="font-serif font-normal italic text-accent">terpilih</span>
            </h2>
            <A href="/portofolio" class="text-sm font-medium underline-offset-4 hover:underline">Lihat portofolio ↗</A>
          </div>
        </Reveal>
        <div class="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-12">
          <Reveal class="md:col-span-7"><ProjectCard project={projects[0]} /></Reveal>
          <Reveal class="md:col-span-5 md:mt-32" delay={100}><ProjectCard project={projects[1]} tall /></Reveal>
          <Reveal class="md:col-span-5" delay={100}><ProjectCard project={projects[2]} tall /></Reveal>
          <Reveal class="md:col-span-7 md:mt-40"><ProjectCard project={projects[3]} /></Reveal>
        </div>
      </section>

      {/* Configurator CTA */}
      <section class="grain overflow-hidden bg-ink text-paper">
        <div class="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32">
          <Reveal>
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-white/40">( Desainer 3D )</p>
            <h2 class="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              Rancang sendiri. <span class="font-serif font-normal italic text-accent">Lihat dalam 3D.</span>
            </h2>
            <p class="mt-6 max-w-md text-lg text-white/60">
              Atur ukuran, warna aluminium, dan jenis kaca. Lihat estimasi harganya, lalu kirim desainnya ke WhatsApp
              kami.
            </p>
            <A
              href="/desain"
              class="mt-10 inline-flex rounded-full bg-accent px-7 py-3.5 font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Buka desainer 3D ↗
            </A>
          </Reveal>
          <Reveal delay={150}>
            <CabinetSketch />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <h2 class="font-display text-5xl font-bold tracking-tight md:text-7xl">
            Cara <span class="font-serif font-normal italic">kerja</span>
          </h2>
        </Reveal>
        <ol class="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          <For each={steps}>
            {(step, i) => (
              <li class="bg-paper p-8">
                <Reveal delay={i() * 100}>
                  <span class="font-serif text-6xl italic text-accent">{i() + 1}</span>
                  <p class="mt-8 font-display text-xl font-semibold">{step.title}</p>
                  <p class="mt-3 text-sm leading-relaxed text-mute">{step.desc}</p>
                </Reveal>
              </li>
            )}
          </For>
        </ol>
      </section>

      {/* Testimonials */}
      <section class="border-t border-line">
        <div class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-mute">( Kata mereka )</p>
          </Reveal>
          <div class="mt-12 grid gap-12 md:grid-cols-3">
            <For each={testimonials}>
              {(t, i) => (
                <Reveal delay={i() * 100}>
                  <figure>
                    <blockquote class="font-serif text-3xl leading-snug">“{t.text}”</blockquote>
                    <figcaption class="mt-6 flex items-center gap-3 text-sm">
                      <span class="h-px w-8 bg-ink" />
                      <span class="font-medium">{t.name}</span>
                      <span class="text-mute">· {t.role}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              )}
            </For>
          </div>
        </div>
      </section>
    </>
  );
}

// Line-art cabinet illustration for the configurator teaser
function CabinetSketch() {
  return (
    <svg viewBox="0 0 400 430" class="mx-auto w-full max-w-md" fill="none" stroke="currentColor" stroke-width="2">
      <g class="text-white/80">
        <path d="M110 70 L250 40 L330 80 L190 110 Z" />
        <path d="M110 70 L110 330 L190 370 L190 110" />
        <path d="M190 370 L330 340 L330 80" />
        <path d="M150 90 L150 350" stroke-dasharray="4 6" class="text-white/30" />
        <path d="M190 175 L330 145 M190 240 L330 210 M190 305 L330 275" class="text-white/40" />
        <path d="M260 97 L260 355" />
      </g>
      <g class="text-accent">
        <path d="M245 210 L245 250 M275 204 L275 244" stroke-width="4" stroke-linecap="round" />
        <path d="M110 385 L190 395" stroke-width="1.5" />
        <path d="M110 380 L110 390 M190 390 L190 400" stroke-width="1.5" />
      </g>
      <text x="130" y="415" class="fill-accent" stroke="none" font-size="13" font-family="Geomini">50 cm</text>
      <text x="340" y="215" class="fill-white/50" stroke="none" font-size="13" font-family="Geomini">180 cm</text>
    </svg>
  );
}
