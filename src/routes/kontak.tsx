import { createSignal, For, Show } from "solid-js";
import PageHero from "~/components/PageHero";
import Seo from "~/components/Seo";
import { services } from "~/lib/content";
import { site, waLink } from "~/lib/site";

export default function Kontak() {
  const [name, setName] = createSignal("");
  const [need, setNeed] = createSignal(services[0].title);
  const [message, setMessage] = createSignal("");

  // No backend needed: the form composes a WhatsApp message
  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    const text = [
      `Halo ${site.name}, saya ${name() || "calon pelanggan"}.`,
      `Kebutuhan: ${need()}`,
      message() && `Detail: ${message()}`
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener");
  };

  const field =
    "mt-2 w-full border-0 border-b border-ink bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-mute/60 focus:border-accent";

  return (
    <>
      <Seo
        path="/kontak"
        title="Kontak"
        description={`Hubungi ${site.name} untuk konsultasi dan survei gratis. Alamat: ${site.address}.`}
      />
      <PageHero
        eyebrow="Kontak"
        title={<>Ngobrol <span class="font-serif font-normal italic text-accent">dulu</span>, gratis.</>}
        intro="Konsultasi dan survei lokasi gratis. Kami biasanya balas dalam hitungan menit."
      />

      <section class="mx-auto grid max-w-[1400px] gap-16 px-5 pb-24 md:grid-cols-12 md:px-10 md:pb-32">
        <form onSubmit={submit} class="space-y-10 md:col-span-7">
          <label class="block">
            <span class="text-xs font-medium uppercase tracking-[0.2em] text-mute">Nama Anda</span>
            <input class={field} placeholder="Budi" value={name()} onInput={e => setName(e.currentTarget.value)} required />
          </label>
          <fieldset>
            <legend class="text-xs font-medium uppercase tracking-[0.2em] text-mute">Kebutuhan</legend>
            <div class="mt-4 flex flex-wrap gap-2">
              <For each={[...services.map(s => s.title), "Lainnya"]}>
                {title => (
                  <button
                    type="button"
                    onClick={() => setNeed(title)}
                    class="rounded-full border px-4 py-2 text-sm transition-colors"
                    classList={{ "border-ink bg-ink text-paper": need() === title, "border-line hover:border-ink": need() !== title }}
                  >
                    {title}
                  </button>
                )}
              </For>
            </div>
          </fieldset>
          <label class="block">
            <span class="text-xs font-medium uppercase tracking-[0.2em] text-mute">Detail</span>
            <textarea
              class={field}
              rows={3}
              placeholder="Ukuran, lokasi, referensi desain…"
              value={message()}
              onInput={e => setMessage(e.currentTarget.value)}
            />
          </label>
          <button class="group inline-flex items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 text-lg font-medium text-white">
            Kirim ke WhatsApp
            <span class="grid h-11 w-11 place-items-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:rotate-45">
              ↗
            </span>
          </button>
        </form>

        <aside class="space-y-8 md:col-span-4 md:col-start-9">
          <For
            each={[
              { label: "WhatsApp", value: site.phoneDisplay, href: waLink() },
              { label: "Email", value: site.email, href: `mailto:${site.email}` },
              { label: "Workshop", value: site.address },
              { label: "Jam buka", value: site.hours }
            ]}
          >
            {item => (
              <div class="border-t border-line pt-4">
                <p class="text-xs font-medium uppercase tracking-[0.2em] text-mute">{item.label}</p>
                <Show when={item.href} fallback={<p class="mt-2 font-display text-xl font-semibold">{item.value}</p>}>
                  <a href={item.href} target="_blank" rel="noopener" class="mt-2 block font-display text-xl font-semibold hover:text-accent">
                    {item.value} ↗
                  </a>
                </Show>
              </div>
            )}
          </For>
          <Show
            when={site.mapsEmbed}
            fallback={<div class="grid aspect-square place-items-center rounded-2xl bg-paper-dark text-sm text-mute">Peta lokasi</div>}
          >
            <iframe
              src={site.mapsEmbed}
              title="Lokasi workshop"
              class="aspect-square w-full rounded-2xl border-0 grayscale"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </Show>
        </aside>
      </section>
    </>
  );
}
