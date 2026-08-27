import { mutation } from "./_generated/server";

/**
 * Seed data satu-kali untuk deployment Convex BARU (prototype ini saja).
 * Data di bawah adalah SALINAN PERSIS dari `lib/data/products.ts` dan
 * `lib/data/orders.ts` per 16 Agustus 2026 — dua sumber ini akan mulai
 * berbeda begitu salah satu diedit; `lib/data/*.ts` tetap sumber yang
 * dipakai frontend sampai halaman-halaman disambungkan ke Convex.
 *
 * Cara pakai (SEKALI SAJA per deployment baru, setelah `npx convex dev`
 * berhasil jalan dan schema ter-deploy):
 *
 *   npx convex run seed:seedAll
 *
 * Aman dijalankan berkali-kali — fungsi ini cek dulu apakah tabel
 * `products` sudah terisi, dan langsung berhenti (tidak dobel insert)
 * kalau sudah ada isinya. Untuk reset total, hapus data lewat Convex
 * dashboard dulu baru jalankan lagi.
 */

const CATEGORIES = [
  { slug: "wanita", name: "Wanita", image: "/images/categories/category-wanita.jpg" },
  { slug: "pria", name: "Pria", image: "/images/categories/category-pria.jpg" },
  { slug: "sepatu", name: "Sepatu", image: "/images/categories/category-sepatu.jpg" },
  { slug: "tas", name: "Tas", image: "/images/categories/category-tas.jpg" },
  { slug: "aksesoris", name: "Aksesoris", image: "/images/categories/category-aksesoris.jpg" },
];

const SIZE_VARIANT = { name: "Ukuran", options: ["S", "M", "L", "XL"] };
const SHOE_SIZE_VARIANT = { name: "Ukuran", options: ["38", "39", "40", "41", "42"] };

const PRODUCTS = [
  {
    slug: "blouse-linen-wanita-krem",
    name: "Blouse Linen Wanita — Krem",
    categorySlug: "wanita",
    price: 189000,
    compareAtPrice: 249000,
    images: ["/images/products/product-blouse-linen-wanita-krem.jpg"],
    badge: "Sale" as const,
    rating: 4.6,
    reviewCount: 128,
    shortDescription: "Blouse linen ringan, adem dipakai harian.",
    description:
      "Blouse berbahan linen premium yang ringan dan adem, cocok untuk aktivitas harian maupun semi-formal. Potongan longgar dengan detail kancing depan dan kerah kemeja klasik.",
    variants: [SIZE_VARIANT, { name: "Warna", options: ["Krem", "Putih Tulang"] }],
    stock: 24,
    sku: "KRY-WN-001",
  },
  {
    slug: "dress-midi-rayon-navy",
    name: "Dress Midi Rayon — Navy",
    categorySlug: "wanita",
    price: 259000,
    images: ["/images/products/product-dress-midi-rayon-navy.jpg"],
    badge: "Baru" as const,
    rating: 4.8,
    reviewCount: 64,
    shortDescription: "Dress midi rayon jatuh, cocok untuk acara santai.",
    description:
      "Dress midi berbahan rayon dengan jatuh kain yang halus dan nyaman. Siluet A-line yang nyaman dipakai seharian, cocok untuk acara santai hingga semi-formal.",
    variants: [SIZE_VARIANT],
    stock: 15,
    sku: "KRY-WN-002",
  },
  {
    slug: "rok-plisket-wanita-hitam",
    name: "Rok Plisket Wanita — Hitam",
    categorySlug: "wanita",
    price: 175000,
    images: ["/images/products/product-rok-plisket-wanita-hitam.jpg"],
    rating: 4.5,
    reviewCount: 41,
    shortDescription: "Rok plisket dengan gerakan kain yang ringan.",
    description:
      "Rok model plisket (pleated) dengan gerakan kain yang ringan saat dipakai bergerak. Elastic waistband untuk kenyamanan sepanjang hari.",
    variants: [SIZE_VARIANT],
    stock: 30,
    sku: "KRY-WN-003",
  },
  {
    slug: "outer-cardigan-wanita-sage",
    name: "Cardigan Rajut — Sage",
    categorySlug: "wanita",
    price: 219000,
    compareAtPrice: 269000,
    images: ["/images/products/product-outer-cardigan-wanita-sage.jpg"],
    badge: "Sale" as const,
    rating: 4.7,
    reviewCount: 89,
    shortDescription: "Cardigan rajut lembut untuk ruangan ber-AC.",
    description:
      "Cardigan rajut dengan tekstur lembut, cocok dipakai di ruangan ber-AC atau sebagai outer tipis. Kancing depan dan saku samping fungsional.",
    variants: [SIZE_VARIANT],
    stock: 18,
    sku: "KRY-WN-004",
  },
  {
    slug: "kemeja-katun-pria-putih",
    name: "Kemeja Katun Pria — Putih",
    categorySlug: "pria",
    price: 199000,
    images: ["/images/products/product-kemeja-katun-pria-putih.jpg"],
    badge: "Terlaris" as const,
    rating: 4.9,
    reviewCount: 203,
    shortDescription: "Kemeja katun basic, wajib punya di lemari.",
    description:
      "Kemeja katun basic dengan potongan regular fit — item wajib punya. Bahan katun 100% yang breathable, mudah dipadupadankan untuk kerja maupun santai.",
    variants: [SIZE_VARIANT],
    stock: 40,
    sku: "KRY-PR-001",
  },
  {
    slug: "kaos-polos-pria-navy",
    name: "Kaos Polos Pria — Navy",
    categorySlug: "pria",
    price: 89000,
    images: ["/images/products/product-kaos-polos-pria-navy.jpg"],
    rating: 4.4,
    reviewCount: 156,
    shortDescription: "Kaos katun combed 24s, adem dan tidak mudah melar.",
    description:
      "Kaos polos berbahan cotton combed 24s yang adem dan tidak mudah melar setelah dicuci berkali-kali. Basic item untuk daily wear.",
    variants: [SIZE_VARIANT, { name: "Warna", options: ["Navy", "Hitam", "Abu-abu"] }],
    stock: 55,
    sku: "KRY-PR-002",
  },
  {
    slug: "celana-chino-pria-khaki",
    name: "Celana Chino Pria — Khaki",
    categorySlug: "pria",
    price: 229000,
    images: ["/images/products/product-celana-chino-pria-khaki.jpg"],
    rating: 4.6,
    reviewCount: 72,
    shortDescription: "Chino slim fit, nyaman untuk kerja maupun santai.",
    description:
      "Celana chino dengan potongan slim fit yang nyaman dipakai untuk kerja maupun akhir pekan. Bahan twill dengan sedikit stretch.",
    variants: [{ name: "Ukuran Pinggang", options: ["29", "30", "31", "32", "33", "34"] }],
    stock: 33,
    sku: "KRY-PR-003",
  },
  {
    slug: "jaket-denim-pria-biru",
    name: "Jaket Denim Pria — Biru",
    categorySlug: "pria",
    price: 329000,
    compareAtPrice: 399000,
    images: ["/images/products/product-jaket-denim-pria-biru.jpg"],
    badge: "Sale" as const,
    rating: 4.7,
    reviewCount: 47,
    shortDescription: "Jaket denim klasik, tahan lama.",
    description:
      "Jaket denim dengan potongan klasik dan bahan tebal yang tahan lama. Cocok dipakai sebagai outer di segala musim.",
    variants: [SIZE_VARIANT],
    stock: 12,
    sku: "KRY-PR-004",
  },
  {
    slug: "sneakers-canvas-putih",
    name: "Sneakers Canvas — Putih",
    categorySlug: "sepatu",
    price: 249000,
    images: ["/images/products/product-sneakers-canvas-putih.jpg"],
    badge: "Terlaris" as const,
    rating: 4.8,
    reviewCount: 312,
    shortDescription: "Sneakers canvas ringan untuk aktivitas harian.",
    description:
      "Sneakers berbahan canvas yang ringan dengan sol karet anti-slip. Desain minimalis yang mudah dipadupadankan dengan berbagai outfit.",
    variants: [SHOE_SIZE_VARIANT],
    stock: 60,
    sku: "KRY-SP-001",
  },
  {
    slug: "sandal-slide-krem",
    name: "Sandal Slide — Krem",
    categorySlug: "sepatu",
    price: 129000,
    images: ["/images/products/product-sandal-slide-krem.jpg"],
    rating: 4.3,
    reviewCount: 58,
    shortDescription: "Sandal slide empuk untuk santai di rumah.",
    description:
      "Sandal slide dengan footbed empuk yang nyaman untuk aktivitas santai di rumah atau jalan-jalan singkat.",
    variants: [SHOE_SIZE_VARIANT],
    stock: 45,
    sku: "KRY-SP-002",
  },
  {
    slug: "flat-shoes-wanita-hitam",
    name: "Flat Shoes Wanita — Hitam",
    categorySlug: "sepatu",
    price: 179000,
    images: ["/images/products/product-flat-shoes-wanita-hitam.jpg"],
    badge: "Baru" as const,
    rating: 4.6,
    reviewCount: 29,
    shortDescription: "Flat shoes nyaman untuk dipakai seharian.",
    description:
      "Flat shoes dengan desain simpel dan footbed yang empuk, nyaman dipakai seharian untuk kerja maupun acara santai.",
    variants: [SHOE_SIZE_VARIANT],
    stock: 22,
    sku: "KRY-SP-003",
  },
  {
    slug: "boots-chelsea-cokelat",
    name: "Boots Chelsea — Cokelat",
    categorySlug: "sepatu",
    price: 389000,
    images: ["/images/products/product-boots-chelsea-cokelat.jpg"],
    rating: 4.7,
    reviewCount: 36,
    shortDescription: "Chelsea boots kulit sintetis, klasik dan tahan lama.",
    description:
      "Chelsea boots berbahan kulit sintetis berkualitas dengan elastic side panel untuk kemudahan memakai. Desain klasik yang tidak lekang zaman.",
    variants: [SHOE_SIZE_VARIANT],
    stock: 14,
    sku: "KRY-SP-004",
  },
  {
    slug: "tote-bag-kanvas-natural",
    name: "Tote Bag Kanvas — Natural",
    categorySlug: "tas",
    price: 149000,
    images: ["/images/products/product-tote-bag-kanvas-natural.jpg"],
    badge: "Terlaris" as const,
    rating: 4.8,
    reviewCount: 198,
    shortDescription: "Tote bag serbaguna, muat laptop 14 inci.",
    description:
      "Tote bag berbahan kanvas tebal yang serbaguna, muat laptop hingga 14 inci. Cocok untuk kerja, kuliah, atau belanja harian.",
    variants: [],
    stock: 50,
    sku: "KRY-TS-001",
  },
  {
    slug: "sling-bag-mini-terracotta",
    name: "Sling Bag Mini — Terracotta",
    categorySlug: "tas",
    price: 165000,
    compareAtPrice: 199000,
    images: ["/images/products/product-sling-bag-mini-terracotta.jpg"],
    badge: "Sale" as const,
    rating: 4.5,
    reviewCount: 52,
    shortDescription: "Sling bag mini untuk bawaan ringkas.",
    description:
      "Sling bag mini yang pas untuk bawaan ringkas — dompet, ponsel, kunci. Tali panjang bisa disesuaikan.",
    variants: [],
    stock: 20,
    sku: "KRY-TS-002",
  },
  {
    slug: "ransel-harian-navy",
    name: "Ransel Harian — Navy",
    categorySlug: "tas",
    price: 279000,
    images: ["/images/products/product-ransel-harian-navy.jpg"],
    rating: 4.6,
    reviewCount: 67,
    shortDescription: "Ransel dengan kompartemen laptop empuk.",
    description:
      "Ransel harian dengan kompartemen laptop berlapis busa dan beberapa saku organizer. Tahan air ringan, cocok untuk commuting.",
    variants: [],
    stock: 28,
    sku: "KRY-TS-003",
  },
  {
    slug: "kacamata-hitam-bulat",
    name: "Kacamata Hitam Bulat",
    categorySlug: "aksesoris",
    price: 99000,
    images: ["/images/products/product-kacamata-hitam-bulat.jpg"],
    badge: "Baru" as const,
    rating: 4.4,
    reviewCount: 33,
    shortDescription: "Kacamata hitam dengan lensa UV400.",
    description:
      "Kacamata hitam berbentuk bulat dengan proteksi lensa UV400. Frame ringan yang nyaman dipakai seharian.",
    variants: [],
    stock: 40,
    sku: "KRY-AK-001",
  },
  {
    slug: "jam-tangan-minimalis-navy",
    name: "Jam Tangan Minimalis — Navy",
    categorySlug: "aksesoris",
    price: 259000,
    images: ["/images/products/product-jam-tangan-minimalis-navy.jpg"],
    rating: 4.7,
    reviewCount: 91,
    shortDescription: "Jam tangan minimalis, tali kulit sintetis.",
    description:
      "Jam tangan dengan wajah minimalis dan tali kulit sintetis. Water resistant untuk pemakaian harian.",
    variants: [{ name: "Warna", options: ["Tali Navy", "Tali Cokelat"] }],
    stock: 17,
    sku: "KRY-AK-002",
  },
  {
    slug: "scarf-motif-earth-tone",
    name: "Scarf Motif — Earth Tone",
    categorySlug: "aksesoris",
    price: 79000,
    images: ["/images/products/product-scarf-motif-earth-tone.jpg"],
    rating: 4.5,
    reviewCount: 24,
    shortDescription: "Scarf voal ringan dengan motif earth tone.",
    description:
      "Scarf berbahan voal yang ringan dan lembut, dengan motif earth tone yang mudah dipadupadankan.",
    variants: [],
    stock: 35,
    sku: "KRY-AK-003",
  },
];

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").take(1);
    if (existing.length > 0) {
      return { skipped: true, reason: "Tabel products sudah terisi — seed dilewati." };
    }

    for (const c of CATEGORIES) {
      await ctx.db.insert("categories", c);
    }
    for (const p of PRODUCTS) {
      await ctx.db.insert("products", p);
    }

    // 3 pesanan contoh (sama seperti lib/data/orders.ts) — referensi
    // produk via slug (bukan _id Convex) supaya independen dari urutan
    // insert di atas.
    const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug)!;
    const itemFrom = (slug: string, quantity: number, variantLabel?: string) => {
      const p = bySlug(slug);
      return {
        productId: p.sku,
        name: p.name,
        variantLabel,
        unitPrice: p.price,
        quantity,
        imageUrl: p.images[0] ?? null,
      };
    };

    await ctx.db.insert("orders", {
      orderNumber: "KRY-10041001",
      status: "selesai",
      createdAtLabel: "2 Agustus 2026",
      items: [
        itemFrom("kemeja-katun-pria-putih", 1, "L"),
        itemFrom("celana-chino-pria-khaki", 1, "31"),
      ],
      subtotal: 428000,
      shippingCost: 15000,
      total: 443000,
      shippingLabel: "Reguler (3-5 hari)",
      paymentLabel: "Transfer Bank",
      recipientName: "Budi Santoso",
      address: "Jl. Merdeka No. 12, Jakarta Selatan, 12345",
    });

    await ctx.db.insert("orders", {
      orderNumber: "KRY-10101002",
      status: "dikirim",
      createdAtLabel: "10 Agustus 2026",
      items: [itemFrom("sneakers-canvas-putih", 1, "40")],
      subtotal: 249000,
      shippingCost: 35000,
      total: 284000,
      shippingLabel: "Express (1-2 hari)",
      paymentLabel: "E-Wallet",
      recipientName: "Budi Santoso",
      address: "Jl. Merdeka No. 12, Jakarta Selatan, 12345",
    });

    await ctx.db.insert("orders", {
      orderNumber: "KRY-10151003",
      status: "diproses",
      createdAtLabel: "15 Agustus 2026",
      items: [
        itemFrom("dress-midi-rayon-navy", 1, "M"),
        itemFrom("sling-bag-mini-terracotta", 1),
      ],
      subtotal: 424000,
      shippingCost: 15000,
      total: 439000,
      shippingLabel: "Reguler (3-5 hari)",
      paymentLabel: "Transfer Bank",
      recipientName: "Budi Santoso",
      address: "Jl. Merdeka No. 12, Jakarta Selatan, 12345",
    });

    return {
      skipped: false,
      inserted: { categories: CATEGORIES.length, products: PRODUCTS.length, orders: 3 },
    };
  },
});
