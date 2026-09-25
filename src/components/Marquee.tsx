import { For } from "solid-js";

export default function Marquee(props: { items: string[]; class?: string }) {
  // Content is duplicated so the -50% translate loops seamlessly
  const row = () => [...props.items, ...props.items];
  return (
    <div class={`overflow-hidden ${props.class ?? ""}`} aria-hidden="true">
      <div class="flex w-max animate-marquee">
        <For each={row()}>
          {item => (
            <span class="flex items-center gap-8 px-8 font-display text-3xl font-semibold md:text-5xl">
              {item}
              <span class="text-accent">✦</span>
            </span>
          )}
        </For>
      </div>
    </div>
  );
}
