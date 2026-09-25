import { Link, Meta, Title } from "@solidjs/meta";
import { site } from "~/lib/site";

type Props = { title?: string; description?: string; path: string };

export default function Seo(props: Props) {
  const title = () => (props.title ? `${props.title} | ${site.name}` : `${site.name} — ${site.tagline}`);
  const description = () => props.description ?? site.description;
  const url = () => site.url + props.path;

  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={description()} />
      <Link rel="canonical" href={url()} />
      <Meta property="og:type" content="website" />
      <Meta property="og:locale" content="id_ID" />
      <Meta property="og:site_name" content={site.name} />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:url" content={url()} />
    </>
  );
}

// Structured data so Google understands this is a local business
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: "+" + site.whatsapp,
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: site.city, addressCountry: "ID" },
    openingHours: "Mo-Sa 08:00-17:00",
    areaServed: site.city
  };
  return <script type="application/ld+json" innerHTML={JSON.stringify(data)} />;
}
