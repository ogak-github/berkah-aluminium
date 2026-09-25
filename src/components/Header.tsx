import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal, For } from "solid-js";
import { navLinks, site, waLink } from "~/lib/site";

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = createSignal(false);
  const isActive = (href: string) => (href === "/" ? location.pathname === "/" : location.pathname.startsWith(href));

  // Lock page scroll while the fullscreen menu is open
  createEffect(() => document.body.classList.toggle("overflow-hidden", open()));

  return (
    <header class="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <A href="/" class="font-display text-lg font-bold tracking-tight">
          Berkah<span class="text-accent">.</span>Aluminium
        </A>

        <nav class="hidden items-center gap-8 md:flex">
          <For each={navLinks.slice(1)}>
            {link => (
              <A href={link.href} class="group relative text-sm font-medium">
                {link.label}
                <span
                  class="absolute -bottom-1 left-0 h-px bg-ink transition-all duration-300"
                  classList={{ "w-full": isActive(link.href), "w-0 group-hover:w-full": !isActive(link.href) }}
                />
              </A>
            )}
          </For>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            class="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Konsultasi gratis ↗
          </a>
        </nav>

        <button
          class="relative z-50 text-sm font-medium uppercase tracking-widest md:hidden"
          classList={{ "text-paper": open() }}
          aria-expanded={open()}
          onClick={() => setOpen(!open())}
        >
          {open() ? "Tutup" : "Menu"}
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        class="grain fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-24 text-paper transition-[clip-path] duration-500 ease-out md:hidden"
        style={{ "clip-path": open() ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
        aria-hidden={!open()}
      >
        <nav class="flex flex-col">
          <For each={navLinks}>
            {(link, i) => (
              <A
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open() ? 0 : -1}
                class="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl font-semibold"
                classList={{ "text-accent": isActive(link.href) }}
              >
                <span class="font-sans text-xs text-white/40">0{i() + 1}</span>
                {link.label}
              </A>
            )}
          </For>
        </nav>
        <div class="text-sm text-white/60">
          <p>{site.address}</p>
          <p class="mt-1">WA {site.phoneDisplay}</p>
        </div>
      </div>
    </header>
  );
}
