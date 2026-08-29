import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

/**
 * Query pesanan — read-only, pengganti lib/data/orders.ts. Data DEMO
 * (3 baris seed) untuk menampilkan halaman order tracking/account.
 *
 * **Diperbarui 16 Agustus 2026 — mutation `create` ditambahkan:** ini
 * SEKARANG order store otoritatif sungguhan untuk order yang dibuat lewat
 * `/checkout` (lihat app/checkout/page.tsx), dipicu oleh permintaan
 * pemilik proyek soal push notification admin saat ada pesanan baru
 * (PRD Manage §16.3/16.4). Setelah insert, action pengirim push
 * (`internal.notificationActions.sendOrderPushNotification`) dijadwalkan
 * via `ctx.scheduler` — bukan dipanggil langsung dari mutation (mutation
 * Convex tidak boleh melakukan side effect eksternal seperti HTTP request
 * ke Push Provider).
 */

export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getByOrderNumber = query({
  args: { orderNumber: v.string() },
  handler: async (ctx, { orderNumber }) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_orderNumber", (q) => q.eq("orderNumber", orderNumber))
      .unique();
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});

export const create = mutation({
  args: {
    orderNumber: v.string(),
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
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "diproses",
      createdAtLabel: new Date().toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      createdAtMs: Date.now(),
      source: "checkout",
    });

    // Kirim push notification ke admin Manage — dijadwalkan (bukan
    // langsung/synchronous) supaya checkout tetap cepat dan tidak gagal
    // kalau pengiriman push bermasalah. Action pengirim ada di file
    // terpisah (notificationActions.ts, bertanda "use node") karena
    // Convex melarang action Node dan mutation/query V8 isolate satu file.
    await ctx.scheduler.runAfter(0, (internal as any).notificationActions.sendOrderPushNotification, {
      orderId,
    });

    return orderId;
  },
});
