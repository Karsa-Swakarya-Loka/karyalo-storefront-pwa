import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Schema Convex BARU untuk Karyalo_Storefront_PWA — SENGAJA terpisah dari
 * `Karyalo_Store_Manage/convex` (backend Alina yang belum digeneralisasi).
 * Keputusan pemilik proyek, 16 Agustus 2026: mulai backend baru dari nol
 * untuk prototype ini, bukan mewarisi/menggeneralisasi backend Alina yang
 * besar (145KB+ per file, terikat erat ke proses bisnis Alina — DOKU,
 * Biteship, OMS live `oms.alinaofficial.store` ter-hardcode di
 * `Karyalo_Store_Manage/scripts/start.sh`).
 *
 * Bentuk tabel di bawah SENGAJA meniru persis shape data mock yang sudah
 * dipakai di `lib/data/products.ts` dan `lib/data/orders.ts` supaya
 * migrasi dari mock ke Convex nanti tinggal ganti isi fungsi, bukan
 * menulis ulang seluruh halaman.
 *
 * TIDAK ADA di sini (sengaja, belum diperlukan prototype ini): auth user
 * sungguhan, integrasi payment/shipping gateway, inventory reservation.
 * Itu semua federated service concern per PRD §55 — akan jadi pekerjaan
 * terpisah begitu prototype ini divalidasi.
 */
export default defineSchema({
  categories: defineTable({
    slug: v.string(),
    name: v.string(),
    image: v.string(),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    slug: v.string(),
    name: v.string(),
    categorySlug: v.string(),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    images: v.array(v.string()),
    badge: v.optional(
      v.union(v.literal("Baru"), v.literal("Sale"), v.literal("Terlaris"))
    ),
    rating: v.number(),
    reviewCount: v.number(),
    shortDescription: v.string(),
    description: v.string(),
    variants: v.array(
      v.object({
        name: v.string(),
        options: v.array(v.string()),
      })
    ),
    stock: v.number(),
    sku: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categorySlug"]),

  // Order — awalnya mock/demo (3 baris seed), sekarang JUGA menerima order
  // sungguhan dari checkout (lihat `orders.create`, ditambahkan 16 Agustus
  // 2026 untuk memicu push notification admin — PRD Manage §16.3/16.4).
  // Field `createdAtMs`/`source` dibuat OPTIONAL supaya 3 baris seed lama
  // (tanpa field ini) tetap valid terhadap schema, tidak perlu migrasi.
  orders: defineTable({
    orderNumber: v.string(),
    status: v.union(
      v.literal("diproses"),
      v.literal("dikirim"),
      v.literal("selesai"),
      v.literal("dibatalkan")
    ),
    createdAtLabel: v.string(), // format tampilan siap pakai (mock)
    createdAtMs: v.optional(v.number()), // timestamp asli — order checkout sungguhan mengisi ini
    source: v.optional(v.union(v.literal("seed"), v.literal("checkout"))), // pembeda demo vs sungguhan
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        variantLabel: v.optional(v.string()),
        unitPrice: v.number(),
        quantity: v.number(),
        imageUrl: v.union(v.string(), v.null()),
      })
    ),
    subtotal: v.number(),
    shippingCost: v.number(),
    total: v.number(),
    shippingLabel: v.string(),
    paymentLabel: v.string(),
    recipientName: v.string(),
    address: v.string(),
  }).index("by_orderNumber", ["orderNumber"]),

  // BARU 16 Agustus 2026 — Web Push subscription per device admin Manage.
  // Disimpan di backend YANG SAMA dengan storefront (bukan backend Manage
  // terpisah — itu belum ada/belum diputuskan) karena trigger-nya
  // (`orders.create`) juga di sini; lihat notifications.ts.
  pushSubscriptions: defineTable({
    endpoint: v.string(),
    p256dh: v.string(),
    auth: v.string(),
    label: v.optional(v.string()), // contoh: "Budi Santoso (Owner)"
    createdAtMs: v.number(),
  }).index("by_endpoint", ["endpoint"]),
});
