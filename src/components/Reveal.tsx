import { onCleanup, onMount, type JSX } from "solid-js";

let observer: IntersectionObserver | undefined;

const getObserver = () =>
  (observer ??= new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer!.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  ));

// Fades its children in once they scroll into view.
// `immediate` plays a CSS-only entrance on page load instead, for above-the-fold content,
// so the hero (the LCP element) doesn't stay hidden until JS hydrates.
export default function Reveal(props: { children: JSX.Element; delay?: number; class?: string; immediate?: boolean }) {
  let el!: HTMLDivElement;
  onMount(() => !props.immediate && getObserver().observe(el));
  onCleanup(() => el && observer?.unobserve(el));
  return (
    <div
      ref={el}
      data-reveal={props.immediate ? "load" : ""}
      class={props.class}
      style={{ "--reveal-delay": `${props.delay ?? 0}ms` }}
    >
      {props.children}
    </div>
  );
}
