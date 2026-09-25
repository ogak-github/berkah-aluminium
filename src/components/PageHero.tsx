import type { JSX } from "solid-js";
import Reveal from "./Reveal";

// Shared oversized heading used at the top of inner pages
export default function PageHero(props: { eyebrow: string; title: JSX.Element; intro?: string }) {
  return (
    <section class="mx-auto max-w-[1400px] px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
      <Reveal>
        <p class="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-mute">
          <span class="h-px w-8 bg-ink" />
          {props.eyebrow}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h1 class="mt-6 font-display text-[clamp(2.75rem,8vw,7.5rem)] font-bold leading-[0.92] tracking-tight">
          {props.title}
        </h1>
      </Reveal>
      {props.intro && (
        <Reveal delay={200}>
          <p class="mt-8 max-w-xl text-lg leading-relaxed text-mute">{props.intro}</p>
        </Reveal>
      )}
    </section>
  );
}
