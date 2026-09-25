import { A } from "@solidjs/router";
import { For } from "solid-js";
import { navLinks, site, waLink } from "~/lib/site";

export default function Footer() {
  return (
    <footer class="grain overflow-hidden bg-ink text-paper">
      <div class="mx-auto max-w-[1400px] px-5 pt-20 md:px-10">
        <div class="grid gap-12 md:grid-cols-12">
          <div class="md:col-span-5">
            <p class="font-serif text-4xl italic leading-tight md:text-5xl">
              Punya ide ruangan? <span class="text-accent">Kita wujudkan.</span>
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener"
              class="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Chat WhatsApp ↗
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">
            <div>
              <p class="text-xs uppercase tracking-widest text-white/40">Menu</p>
              <ul class="mt-4 space-y-2">
                <For each={navLinks}>{l => <li><A href={l.href} class="hover:text-accent">{l.label}</A></li>}</For>
              </ul>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-white/40">Workshop</p>
              <p class="mt-4 leading-relaxed text-white/80">{site.address}</p>
              <p class="mt-2 text-white/80">{site.hours}</p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-widest text-white/40">Kontak</p>
              <ul class="mt-4 space-y-2 text-white/80">
                <li><a href={waLink()} target="_blank" rel="noopener" class="hover:text-accent">WA {site.phoneDisplay}</a></li>
                <li><a href={`mailto:${site.email}`} class="hover:text-accent">{site.email}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          class="mt-20 select-none whitespace-nowrap font-display text-[17.5vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.07] md:text-[16vw] lg:text-[13.8rem] xl:text-[15.5rem]"
        >
          BERKAH
        </p>
        <div class="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Aluminium · Kaca · Custom</p>
        </div>
      </div>
    </footer>
  );
}
