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

// Fades its children in once they scroll into view
export default function Reveal(props: { children: JSX.Element; delay?: number; class?: string }) {
  let el!: HTMLDivElement;
  onMount(() => getObserver().observe(el));
  onCleanup(() => el && observer?.unobserve(el));
  return (
    <div ref={el} data-reveal class={props.class} style={{ "--reveal-delay": `${props.delay ?? 0}ms` }}>
      {props.children}
    </div>
  );
}
