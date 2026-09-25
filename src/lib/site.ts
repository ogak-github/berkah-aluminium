// Business info — replace placeholders with real data
export const site = {
  name: "Berkah Aluminium",
  tagline: "Spesialis kusen, lemari, kanopi & kaca",
  description:
    "Berkah Aluminium melayani pembuatan lemari aluminium, jendela, pintu kaca, kanopi, partisi, hingga aquarium. Ukuran custom, pengerjaan rapi, bergaransi.",
  url: "https://berkahaluminium.com", // TODO: real domain
  whatsapp: "6281234567890", // TODO: real number, international format without "+"
  phoneDisplay: "0812-3456-7890",
  email: "halo@berkahaluminium.com",
  address: "Jl. Contoh No. 123, Kota Anda", // TODO
  city: "Kota Anda", // TODO
  hours: "Senin – Sabtu, 08.00 – 17.00",
  since: "2015", // TODO: year the workshop started
  mapsEmbed: "" // TODO: Google Maps embed URL
};

export const waLink = (text = "Halo Berkah Aluminium, saya mau tanya-tanya soal pesanan.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/desain", label: "Desain 3D" },
  { href: "/kontak", label: "Kontak" }
];
