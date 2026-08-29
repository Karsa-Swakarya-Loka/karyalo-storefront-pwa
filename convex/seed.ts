import { mutation } from "./_generated/server";

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
    images: [
      "/images/products/product-blouse-linen-wanita-krem.jpg",
      "/images/products/product-blouse-linen-wanita-krem-2.jpg",
    ],
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
    images: [
      "/images/products/product-dress-midi-rayon-navy.jpg",
      "/images/products/product-dress-midi-rayon-navy-2.jpg",
    ],
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
    images: [
      "/images/products/product-rok-plisket-wanita-hitam.jpg",
      "/images/products/product-rok-plisket-wanita-hitam-2.jpg",
    ],
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
    images: [
      "/images/products/product-outer-cardigan-wanita-sage.jpg",
      "/images/products/product-outer-cardigan-wanita-sage-2.jpg",
    ],
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
    images: [
      "/images/products/product-kemeja-katun-pria-putih.jpg",
      "/images/products/product-kemeja-katun-pria-putih-2.jpg",
    ],
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
    images: [
      "/images/products/product-kaos-polos-pria-navy.jpg",
      "/images/products/product-kaos-polos-pria-navy-2.jpg",
    ],
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
    images: [
      "/images/products/product-celana-chino-pria-khaki.jpg",
      "/images/products/product-celana-chino-pria-khaki-2.jpg",
    ],
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
    images: [
      "/images/products/product-jaket-denim-pria-biru.jpg",
      "/images/products/product-jaket-denim-pria-biru-2.jpg",
    ],
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
    images: [
      "/images/products/product-sneakers-canvas-putih.jpg",
      "/images/products/product-sneakers-canvas-putih-2.jpg",
    ],
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
    images: [
      "/images/products/product-sandal-slide-krem.jpg",
      "/images/products/product-sandal-slide-krem-2.jpg",
    ],
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
    images: [
      "/images/products/product-flat-shoes-wanita-hitam.jpg",
      "/images/products/product-flat-shoes-wanita-hitam-2.jpg",
    ],
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
    images: [
      "/images/products/product-boots-chelsea-cokelat.jpg",
      "/images/products/product-boots-chelsea-cokelat-2.jpg",
    ],
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
    images: [
      "/images/products/product-tote-bag-kanvas-natural.jpg",
      "/images/products/product-tote-bag-kanvas-natural-2.jpg",
    ],
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
    images: [
      "/images/products/product-sling-bag-mini-terracotta.jpg",
      "/images/products/product-sling-bag-mini-terracotta-2.jpg",
    ],
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
    images: [
      "/images/products/product-ransel-harian-navy.jpg",
      "/images/products/product-ransel-harian-navy-2.jpg",
    ],
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
    images: [
      "/images/products/product-kacamata-hitam-bulat.jpg",
      "/images/products/product-kacamata-hitam-bulat-2.jpg",
    ],
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
    images: [
      "/images/products/product-jam-tangan-minimalis-navy.jpg",
      "/images/products/product-jam-tangan-minimalis-navy-2.jpg",
    ],
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
    images: [
      "/images/products/product-scarf-motif-earth-tone.jpg",
      "/images/products/product-scarf-motif-earth-tone-2.jpg",
    ],
    badge: "Sale" as const,
    rating: 4.5,
    reviewCount: 24,
    shortDescription: "Scarf sutra satin motif earth tone elegan.",
    description:
      "Scarf sutra satin dengan motif earth tone yang elegan. Cocok untuk pelengkap hijab, scarf leher, atau aksen tas.",
    variants: [],
    stock: 35,
    sku: "KRY-AK-003",
  },
];

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").collect();
    if (existing.length > 0) {
      let updated = 0;
      for (const ep of existing) {
        const match = PRODUCTS.find((p) => p.slug === ep.slug);
        if (match) {
          await ctx.db.patch(ep._id, {
            images: match.images,
            description: match.description,
            shortDescription: match.shortDescription,
          });
          updated++;
        }
      }
      const existingCategories = await ctx.db.query("categories").collect();
      for (const ec of existingCategories) {
        const match = CATEGORIES.find((c) => c.slug === ec.slug);
        if (match) {
          await ctx.db.patch(ec._id, {
            image: match.image,
          });
        }
      }
      return { success: true, reason: `Updated ${updated} products and categories with realistic image paths.` };
    }

    for (const c of CATEGORIES) {
      await ctx.db.insert("categories", c);
    }
    for (const p of PRODUCTS) {
      await ctx.db.insert("products", p);
    }

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
      orderNumber: "ORD-2026-0001",
      status: "selesai",
      items: [
        itemFrom("blouse-linen-wanita-krem", 1, "M / Krem"),
        itemFrom("rok-plisket-wanita-hitam", 1, "M"),
      ],
      subtotal: 364000,
      shippingCost: 15000,
      total: 379000,
      shippingLabel: "Reguler (J&T Express)",
      paymentLabel: "BCA Virtual Account",
      recipientName: "Siti Rahma",
      address: "Jl. Margonda Raya No. 45, Beji, Kota Depok, Jawa Barat 16424",
      createdAtLabel: "12 Agustus 2026, 14:22 WIB",
      createdAtMs: Date.parse("2026-08-12T07:22:00Z"),
      source: "seed" as const,
    });

    return { inserted: { categories: CATEGORIES.length, products: PRODUCTS.length, orders: 1 } };
  },
});
