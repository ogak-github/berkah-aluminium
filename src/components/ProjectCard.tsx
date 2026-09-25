import { Show } from "solid-js";
import type { Project } from "~/lib/content";

// Abstract "frame" patterns used until real photos are available
const patterns: Record<string, string> = {
  Lemari:
    "linear-gradient(90deg,#0f0f0f 3px,transparent 3px) 0 0/33.33% 100%, linear-gradient(#0f0f0f 3px,transparent 3px) 0 0/100% 25%, #e6e2da",
  Kanopi:
    "repeating-linear-gradient(-20deg,#0f0f0f 0 3px,transparent 3px 48px), linear-gradient(160deg,#ffb89f,#e6e2da 70%)",
  Pintu:
    "linear-gradient(90deg,transparent 30%,#0f0f0f 30% calc(30% + 3px),transparent calc(30% + 3px) 70%,#0f0f0f 70% calc(70% + 3px),transparent calc(70% + 3px)), linear-gradient(180deg,#cfe3e8,#e6e2da)",
  Jendela:
    "linear-gradient(90deg,#0f0f0f 3px,transparent 3px) 0 0/50% 100%, linear-gradient(#0f0f0f 3px,transparent 3px) 0 0/100% 50%, linear-gradient(135deg,#d7e7ea,#f1efea)",
  Aquarium:
    "linear-gradient(transparent 35%,rgba(255,79,31,.25) 35%), linear-gradient(90deg,#0f0f0f 3px,transparent 3px) 0 0/100% 100%, #e6e2da",
  Partisi:
    "repeating-linear-gradient(90deg,#0f0f0f 0 3px,transparent 3px 25%), linear-gradient(180deg,#f1efea,#d9d4ca)"
};

export default function ProjectCard(props: { project: Project; index?: number; tall?: boolean }) {
  return (
    <article class="group">
      <div
        class="relative overflow-hidden rounded-2xl bg-paper-dark"
        classList={{ "aspect-[4/5]": props.tall, "aspect-[4/3]": !props.tall }}
      >
        <Show
          when={props.project.image}
          fallback={
            <div
              class="absolute inset-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              style={{ background: patterns[props.project.category] ?? patterns.Lemari }}
            />
          }
        >
          <img
            src={props.project.image}
            alt={props.project.title}
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Show>
        <span class="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-medium">
          {props.project.category}
        </span>
        <Show when={props.project.stock}>
          <span class="absolute bottom-4 left-4 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">
            Foto ilustrasi
          </span>
        </Show>
        <span class="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-accent text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          ↗
        </span>
      </div>
      <div class="mt-4 flex items-baseline justify-between gap-4">
        <h3 class="font-display text-lg font-semibold leading-snug">{props.project.title}</h3>
        <span class="shrink-0 text-sm text-mute">{props.project.year}</span>
      </div>
      <p class="mt-1 text-sm text-mute">{props.project.location}</p>
    </article>
  );
}
