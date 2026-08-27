import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

/**
 * Data produk — Fase 2+ (Discovery/PDP/Cart/Checkout preview).
 *
 * **Diperbarui 16 Agustus 2026 (wiring Convex):** pemilik proyek sudah
 * menjalankan `npx convex dev` + `npx convex run seed:seedAll` dengan
 * sukses (`{ inserted: { categories: 5, products: 18, orders: 3 } }`).
 * Fungsi di bawah sekarang MENCOBA membaca dari Convex (`convex/products.ts`,
 * `convex/categories.ts`) dulu, dan HANYA jatuh ke array mock statis
 * (`MOCK_PRODUCTS`/`CATEGORIES` di bawah) kalau (a) `NEXT_PUBLIC_CONVEX_URL`
 * belum diisi, atau (b) query Convex gagal (mis. deployment belum jalan).
 * Ini SENGAJA, bukan bug — supaya app tidak crash total kalau seseorang
 * membuka project ini tanpa setup Convex (mis. review cepat), dan supaya
 * halaman tetap bisa di-build kalau `next build` berjalan tanpa akses
 * jaringan ke Convex. Kalau ada perbedaan data yang tidak terduga di
 * halaman, cek console browser/terminal untuk warning
 * `[Karyalo] Convex query "..." gagal` — itu tandanya sedang fallback ke
 * mock, bukan datamu yang salah.
 *
 * **Belum divalidasi dari sisi saya** (sandbox tidak punya akses jaringan
 * ke Convex) — kode ditulis mengikuti pola Convex standar dan memetakan
 * field 1:1 ke tipe `Product`/`Category` di bawah, tapi kemungkinan ada
 * kesalahan kecil yang baru ketahuan saat dijalankan. Kalau `npm run dev`
 * menunjukkan error terkait file ini atau `convex/_generated`, salin
 * pesan errornya untuk diperbaiki.
 *
 * File ini TETAP satu-satunya sumber data produk di seluruh app — TIDAK
 * ADA komponen yang boleh mengetik ulang data produk sendiri. `MOCK_PRODUCTS`/
 * `CATEGORIES` di bawah sekarang berperan sebagai fallback, bukan lagi
 * sumber utama, tapi strukturnya dipertahankan sama persis dengan schema
 * Convex (`convex/schema.ts`) supaya keduanya tetap sinkron kalau data
 * seed diperbarui.
 *
 * Foto produk: SEMUA gambar di `public/images/products` adalah placeholder
 * bergambar ikon "foto" generik di atas warna brand — BUKAN foto produk
 * sungguhan (belum ada sesi foto). Lihat PROTOTYPE_STOREFRONT_PWA_README.md.
 *
 * Vertikal: fashion (dikonfirmasi pemilik proyek, 16 Agustus 2026).
 * Harga dalam Rupiah, harga & stok di sini TIDAK otoritatif (§40).
 */

export interface ProductVariantGroup {
  name: string;
  options: string[];
}

export type ProductBadge = "Baru" | "Sale" | "Terlaris";

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  variants: ProductVariantGroup[];
  stock: number;
  sku: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  { slug: "wanita", name: "Wanita", image: "/images/categories/category-wanita.jpg" },
  { slug: "pria", name: "Pria", image: "/images/categories/category-pria.jpg" },
  { slug: "sepatu", name: "Sepatu", image: "/images/categories/category-sepatu.jpg" },
  { slug: "tas", name: "Tas", image: "/images/categories/category-tas.jpg" },
  { slug: "aksesoris", name: "Aksesoris", image: "/images/categories/category-aksesoris.jpg" },
];

const SIZE_VARIANT: ProductVariantGroup = { name: "Ukuran", options: ["S", "M", "L", "XL"] };
const SHOE_SIZE_VARIANT: ProductVariantGroup = { name: "Ukuran", options: ["38", "39", "40", "41", "42"] };
const COLOR_ONLY = (colors: string[]): ProductVariantGroup => ({ name: "Warna", options: colors });

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p01",
    slug: "blouse-linen-wanita-krem",
    name: "Blouse Linen Wanita — Krem",
    categorySlug: "wanita",
    price: 189000,
    compareAtPrice: 249000,
    images: ["/images/products/product-blouse-linen-wanita-krem.jpg"],
    badge: "Sale",
    rating: 4.6,
    reviewCount: 128,
    shortDescription: "Blouse linen ringan, adem dipakai harian.",
    description:
      "Blouse berbahan linen premium yang ringan dan adem, cocok untuk aktivitas harian maupun semi-formal. Potongan longgar dengan detail kancing depan dan kerah kemeja klasik.",
    variants: [SIZE_VARIANT, COLOR_ONLY(["Krem", "Putih Tulang"])],
    stock: 24,
    sku: "KRY-WN-001",
  },
  {
    id: "p02",
    slug: "dress-midi-rayon-navy",
    name: "Dress Midi Rayon — Navy",
    categorySlug: "wanita",
    price: 259000,
    images: ["/images/products/product-dress-midi-rayon-navy.jpg"],
    badge: "Baru",
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
    id: "p03",
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
    id: "p04",
    slug: "outer-cardigan-wanita-sage",
    name: "Cardigan Rajut — Sage",
    categorySlug: "wanita",
    price: 219000,
    compareAtPrice: 269000,
    images: ["/images/products/product-outer-cardigan-wanita-sage.jpg"],
    badge: "Sale",
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
    id: "p05",
    slug: "kemeja-katun-pria-putih",
    name: "Kemeja Katun Pria — Putih",
    categorySlug: "pria",
    price: 199000,
    images: ["/images/products/product-kemeja-katun-pria-putih.jpg"],
    badge: "Terlaris",
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
    id: "p06",
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
    variants: [SIZE_VARIANT, COLOR_ONLY(["Navy", "Hitam", "Abu-abu"])],
    stock: 55,
    sku: "KRY-PR-002",
  },
  {
    id: "p07",
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
    id: "p08",
    slug: "jaket-denim-pria-biru",
    name: "Jaket Denim Pria — Biru",
    categorySlug: "pria",
    price: 329000,
    compareAtPrice: 399000,
    images: ["/images/products/product-jaket-denim-pria-biru.jpg"],
    badge: "Sale",
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
    id: "p09",
    slug: "sneakers-canvas-putih",
    name: "Sneakers Canvas — Putih",
    categorySlug: "sepatu",
    price: 249000,
    images: ["/images/products/product-sneakers-canvas-putih.jpg"],
    badge: "Terlaris",
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
    id: "p10",
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
    id: "p11",
    slug: "flat-shoes-wanita-hitam",
    name: "Flat Shoes Wanita — Hitam",
    categorySlug: "sepatu",
    price: 179000,
    images: ["/images/products/product-flat-shoes-wanita-hitam.jpg"],
    badge: "Baru",
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
    id: "p12",
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
    id: "p13",
    slug: "tote-bag-kanvas-natural",
    name: "Tote Bag Kanvas — Natural",
    categorySlug: "tas",
    price: 149000,
    images: ["/images/products/product-tote-bag-kanvas-natural.jpg"],
    badge: "Terlaris",
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
    id: "p14",
    slug: "sling-bag-mini-terracotta",
    name: "Sling Bag Mini — Terracotta",
    categorySlug: "tas",
    price: 165000,
    compareAtPrice: 199000,
    images: ["/images/products/product-sling-bag-mini-terracotta.jpg"],
    badge: "Sale",
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
    id: "p15",
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
    id: "p16",
    slug: "kacamata-hitam-bulat",
    name: "Kacamata Hitam Bulat",
    categorySlug: "aksesoris",
    price: 99000,
    images: ["/images/products/product-kacamata-hitam-bulat.jpg"],
    badge: "Baru",
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
    id: "p17",
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
    variants: [COLOR_ONLY(["Tali Navy", "Tali Cokelat"])],
    stock: 17,
    sku: "KRY-AK-002",
  },
  {
    id: "p18",
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

// ---------------------------------------------------------------------
// Wiring Convex (16 Agustus 2026) — lihat komentar header file.
// ---------------------------------------------------------------------

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

/** Convex doc (_id, _creationTime, ...schema) -> tipe Product yang dipakai UI. */
function mapProduct(doc: Doc<"products">): Product {
  const { _id, _creationTime, ...rest } = doc;
  void _creationTime;
  return { id: _id, ...rest };
}

/** Convex doc (_id, _creationTime, ...schema) -> tipe Category yang dipakai UI. */
function mapCategory(doc: Doc<"categories">): Category {
  return { slug: doc.slug, name: doc.name, image: doc.image };
}

/**
 * Coba jalankan query Convex; kalau URL belum diisi atau query gagal,
 * jatuh ke fallback mock (dan cetak warning dev supaya kegagalan tidak
 * senyap). Dipakai oleh semua fungsi getX di bawah.
 */
async function safeConvex<T>(run: () => Promise<T>, fallback: T, label: string): Promise<T> {
  if (!CONVEX_URL) return fallback;
  try {
    return await run();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[Karyalo] Convex query "${label}" gagal, fallback ke mock data:`, err);
    }
    return fallback;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  return safeConvex(
    async () => (await fetchQuery(api.products.list, {})).map(mapProduct),
    MOCK_PRODUCTS,
    "products.list"
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return safeConvex(
    async () => {
      const doc = await fetchQuery(api.products.getBySlug, { slug });
      return doc ? mapProduct(doc) : null;
    },
    MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null,
    "products.getBySlug"
  );
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return safeConvex(
    async () =>
      (await fetchQuery(api.products.byCategory, { categorySlug })).map(mapProduct),
    MOCK_PRODUCTS.filter((p) => p.categorySlug === categorySlug),
    "products.byCategory"
  );
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return safeConvex(
    async () => (await fetchQuery(api.products.featured, { limit })).map(mapProduct),
    MOCK_PRODUCTS.slice(0, limit),
    "products.featured"
  );
}

export async function getNewProducts(limit = 8): Promise<Product[]> {
  return safeConvex(
    async () => (await fetchQuery(api.products.newArrivals, { limit })).map(mapProduct),
    MOCK_PRODUCTS.filter((p) => p.badge === "Baru").slice(0, limit),
    "products.newArrivals"
  );
}

export async function getSaleProducts(limit = 8): Promise<Product[]> {
  return safeConvex(
    async () => (await fetchQuery(api.products.onSale, { limit })).map(mapProduct),
    MOCK_PRODUCTS.filter((p) => p.compareAtPrice).slice(0, limit),
    "products.onSale"
  );
}

export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  return safeConvex(
    async () => (await fetchQuery(api.products.bestSellers, { limit })).map(mapProduct),
    MOCK_PRODUCTS.filter((p) => p.badge === "Terlaris").slice(0, limit),
    "products.bestSellers"
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return safeConvex(
    async () => (await fetchQuery(api.products.search, { q })).map(mapProduct),
    MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    ),
    "products.search"
  );
}

export async function getAllCategories(): Promise<Category[]> {
  return safeConvex(
    async () => (await fetchQuery(api.categories.list, {})).map(mapCategory),
    CATEGORIES,
    "categories.list"
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safeConvex(
    async () => {
      const doc = await fetchQuery(api.categories.getBySlug, { slug });
      return doc ? mapCategory(doc) : null;
    },
    CATEGORIES.find((c) => c.slug === slug) ?? null,
    "categories.getBySlug"
  );
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return safeConvex(
    async () =>
      (
        await fetchQuery(api.products.related, {
          categorySlug: product.categorySlug,
          excludeSlug: product.slug,
          limit,
        })
      ).map(mapProduct),
    MOCK_PRODUCTS.filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id
    ).slice(0, limit),
    "products.related"
  );
}
