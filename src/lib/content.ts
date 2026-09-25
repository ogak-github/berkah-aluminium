export type Service = { slug: string; title: string; desc: string; tags: string[] };

export const services: Service[] = [
  { slug: "lemari", title: "Lemari & Rak", desc: "Lemari pakaian, lemari dapur, rak display toko, dan etalase. Anti rayap dan tahan lembap.", tags: ["Kitchen set", "Etalase", "Rak display"] },
  { slug: "jendela", title: "Kusen & Jendela", desc: "Kusen aluminium, jendela geser, casement, dan jalusi untuk rumah maupun ruko.", tags: ["Sliding", "Casement", "Jalusi"] },
  { slug: "pintu", title: "Pintu Kaca", desc: "Pintu kaca frameless, pintu swing, pintu sliding, dan pintu kamar mandi.", tags: ["Frameless", "Swing", "Sliding"] },
  { slug: "kanopi", title: "Kanopi", desc: "Kanopi aluminium dengan atap polycarbonate, kaca tempered, atau alderon.", tags: ["Carport", "Teras", "Balkon"] },
  { slug: "partisi", title: "Partisi & Shower Box", desc: "Sekat ruangan kantor, partisi kaca, dan shower box kamar mandi.", tags: ["Kantor", "Kamar mandi"] },
  { slug: "aquarium", title: "Aquarium & Kaca Custom", desc: "Aquarium ukuran custom, kaca meja, cermin, dan kaca lemari.", tags: ["Aquarium", "Cermin", "Kaca meja"] }
];

// `stock: true` marks a stock illustration photo; the card shows a "Foto ilustrasi" label.
// Replace with real project photos and drop the flag before going live.
export type Project = { title: string; category: string; location: string; year: string; image?: string; stock?: boolean };

export const projects: Project[] = [
  { title: "Kitchen set aluminium 3 meter", category: "Lemari", location: "Griya Asri", year: "2026", image: "/portofolio/kitchen-set.webp", stock: true },
  { title: "Kanopi carport", category: "Kanopi", location: "Jl. Melati", year: "2026", image: "/portofolio/kanopi-carport.webp", stock: true },
  { title: "Pintu kaca sliding", category: "Pintu", location: "Sentra Niaga", year: "2025", image: "/portofolio/pintu-kaca.webp", stock: true },
  { title: "Jendela kaca besar", category: "Jendela", location: "Rumah Bpk. Andi", year: "2025", image: "/portofolio/jendela.webp", stock: true },
  { title: "Aquarium 150 × 50 × 60", category: "Aquarium", location: "Kafe Tirta", year: "2025", image: "/portofolio/aquarium.webp", stock: true },
  { title: "Partisi kaca kantor", category: "Partisi", location: "CV Maju", year: "2024", image: "/portofolio/partisi-kantor.webp", stock: true }
];

// TODO: replace with real customer testimonials before going live
export const testimonials = [
  { name: "Bu Rina", role: "Kitchen set", text: "Lemari dapurnya rapi banget, ukurannya pas sama ruangan. Pengerjaan juga cepat." },
  { name: "Pak Hendra", role: "Kanopi carport", text: "Kanopinya kokoh, hujan deras aman. Harga juga masuk akal." },
  { name: "Mas Dimas", role: "Aquarium custom", text: "Aquarium custom sesuai request, sambungan kacanya bersih." }
];

export const steps = [
  { title: "Konsultasi", desc: "Ceritakan kebutuhan Anda lewat WhatsApp, atau kirim desain dari desainer 3D." },
  { title: "Survei & ukur", desc: "Kami datang ke lokasi untuk mengukur dan memberi rekomendasi material." },
  { title: "Penawaran", desc: "Rincian harga yang transparan sebelum pengerjaan dimulai." },
  { title: "Produksi & pasang", desc: "Dikerjakan di workshop kami, lalu dipasang rapi di lokasi Anda." }
];

// TODO: real numbers
export const stats = [
  { value: "10+", label: "Tahun berkarya" },
  { value: "500+", label: "Proyek selesai" },
  { value: "1 th", label: "Garansi pengerjaan" }
];
