/**
 * Push notification untuk admin Karyalo Manage — data layer (query/
 * mutation, jalan di V8 isolate biasa). BARU 16 Agustus 2026, atas
 * pertanyaan pemilik proyek: "apakah ketika ada pemesanan di storefront,
 * sisi Manage akan dapat push notifikasi?" — jawabannya iya, ini bagian
 * penyimpanan subscription-nya. Pengiriman push sungguhan (butuh Node
 * runtime untuk package `web-push`) ada di file terpisah
 * `notificationActions.ts` — Convex MEWAJIBKAN action bertanda "use node"
 * dipisah dari query/mutation biasa, tidak boleh satu file.
 *
 * Alur lengkap: PRD Manage §16.4, lihat komentar di `notificationActions.ts`.
 */

import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";

/**
 * Dipanggil dari client Manage (karyalo-manage-pwa) setelah admin
 * memberi izin notifikasi & browser membuat PushSubscription. Upsert
 * berdasarkan `endpoint` (satu device/browser = satu endpoint unik dari
 * Push Provider browser, BUKAN dikarang oleh kita).
 */
export const subscribe = mutation({
  args: {
    endpoint: v.string(),
    keys: v.object({ p256dh: v.string(), auth: v.string() }),
    label: v.optional(v.string()),
  },
  handler: async (ctx, { endpoint, keys, label }) => {
    const existing = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_endpoint", (q) => q.eq("endpoint", endpoint))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        p256dh: keys.p256dh,
        auth: keys.auth,
        label,
        createdAtMs: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("pushSubscriptions", {
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      label,
      createdAtMs: Date.now(),
    });
  },
});

/** Dipanggil saat admin klik "Matikan notifikasi" di Manage. */
export const unsubscribe = mutation({
  args: { endpoint: v.string() },
  handler: async (ctx, { endpoint }) => {
    const existing = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_endpoint", (q) => q.eq("endpoint", endpoint))
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});

/**
 * Query publik AMAN — cuma jumlah device terdaftar, BUKAN daftar endpoint
 * mentah (endpoint push adalah data sensitif per PRD §16.4 "push payload
 * meminimalkan PII"). Dipakai `/settings/notifications` di Manage untuk
 * menampilkan status jujur, bukan angka contoh.
 */
export const countSubscriptions = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("pushSubscriptions").collect();
    return rows.length;
  },
});

/** Endpoint milik device INI sudah subscribe atau belum — dipakai tombol subscribe untuk menampilkan status sinkron dari server, bukan hanya localStorage. */
export const isSubscribed = query({
  args: { endpoint: v.string() },
  handler: async (ctx, { endpoint }) => {
    const existing = await ctx.db
      .query("pushSubscriptions")
      .withIndex("by_endpoint", (q) => q.eq("endpoint", endpoint))
      .unique();
    return existing !== null;
  },
});

// --- Internal (hanya dipanggil dari notificationActions.ts, bukan dari client) ---

export const listSubscriptionsInternal = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pushSubscriptions").collect();
  },
});

export const deleteSubscriptionInternal = internalMutation({
  args: { id: v.id("pushSubscriptions") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
