import { A } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import Seo from "~/components/Seo";

export default function NotFound() {
  return (
    <section class="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 py-24 md:px-10">
      <Seo path="/404" title="Halaman tidak ditemukan" />
      <HttpStatusCode code={404} />
      <p class="font-display text-[clamp(6rem,25vw,20rem)] font-extrabold leading-none tracking-tighter">
        4<span class="font-serif font-normal italic text-accent">0</span>4
      </p>
      <p class="mt-6 max-w-md text-lg text-mute">Halaman ini tidak ada, mungkin link-nya salah atau sudah dipindah.</p>
      <A
        href="/"
        class="mt-10 inline-flex w-fit rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-colors hover:bg-accent"
      >
        Kembali ke beranda
      </A>
    </section>
  );
}
