"use node";

/**
 * Push notification untuk admin Karyalo Manage — pengiriman sungguhan.
 * BARU 16 Agustus 2026, mengikuti `Karyalo_Commerce_Admin_CMS_PRD_v1.0.md`
 * §16.4 Notification Event Flow, disederhanakan karena prototype ini
 * belum punya OMS/Notification Service terpisah:
 *
 *   Storefront checkout → orders.create (mutation, convex/orders.ts)
 *     → ctx.scheduler menjadwalkan sendOrderPushNotification (action, di
 *       bawah) → Web Push (VAPID) → Service Worker karyalo-manage-pwa
 *       → notifikasi OS muncul di device admin, walau app tertutup
 *       (selama sudah pernah subscribe — lihat
 *       `karyalo-manage-pwa/components/notifications/PushSubscribeButton.tsx`).
 *
 * File ini butuh "use node" (baris paling atas, WAJIB baris pertama file)
 * karena package `web-push` memakai Node crypto API — Convex query/
 * mutation biasa (lihat notifications.ts) jalan di V8 isolate yang TIDAK
 * punya akses itu; hanya "action" di file bertanda "use node" yang punya
 * runtime Node penuh. Convex MELARANG query/mutation ikut dalam file
 * "use node" yang sama — makanya data layer dipisah ke notifications.ts.
 *
 * Kredensial (BUKAN dikarang, wajib di-generate ulang per deployment):
 * jalankan `npx convex env set VAPID_PUBLIC_KEY "..."` dan
 * `npx convex env set VAPID_PRIVATE_KEY "..."` sekali di deployment Convex
 * kamu — lihat CONVEX_SETUP.md bagian Web Push untuk cara generate.
 */

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import webpush from "web-push";

// PRD §16.3 New-Order Push Notification — format minimum: title, body
// "Order #{nomor} • Rp{total} • {nama}", deep link ke halaman order.
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Dijadwalkan dari `orders.create`. PRD §16.4 requirement yang diterapkan:
 * - "invalid subscription dinonaktifkan" → status 404/410 dari Push
 *   Provider menghapus baris `pushSubscriptions` terkait.
 * - "push payload meminimalkan PII" → payload cuma orderNumber/total/nama
 *   penerima (data milik order itu sendiri) + ID order untuk deep link,
 *   TIDAK ada alamat/telepon.
 * - VAPID belum di-set → gagal AMAN (log & return), bukan crash mutation
 *   pemanggilnya (order tetap tersimpan walau notifikasi gagal terkirim).
 */
export const sendOrderPushNotification = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.warn(
        "[Karyalo] VAPID_PUBLIC_KEY/VAPID_PRIVATE_KEY belum di-set di Convex env — " +
          "push notification order baru DILEWATI (order tetap tersimpan). " +
          "Lihat CONVEX_SETUP.md bagian Web Push."
      );
      return;
    }

    const order = await ctx.runQuery(api.orders.getById, { id: orderId });
    if (!order) return;

    const subscriptions = await ctx.runQuery((internal as any).notifications.listSubscriptionsInternal, {});
    if (subscriptions.length === 0) {
      console.warn("[Karyalo] Order baru masuk tapi belum ada admin yang subscribe push notification.");
      return;
    }

    webpush.setVapidDetails("mailto:admin@karyalo.example", vapidPublicKey, vapidPrivateKey);

    const payload = JSON.stringify({
      title: "Pesanan Baru",
      body: `Order #${order.orderNumber} • ${formatRupiah(order.total)} • ${order.recipientName}`,
      orderId,
    });

    await Promise.all(
      subscriptions.map(async (sub: any) => {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
            payload
          );
        } catch (err) {
          const statusCode = (err as { statusCode?: number })?.statusCode;
          if (statusCode === 404 || statusCode === 410) {
            // Subscription sudah tidak valid (browser di-uninstall/permission
            // dicabut) — nonaktifkan sesuai §16.4, bukan retry terus.
            await ctx.runMutation((internal as any).notifications.deleteSubscriptionInternal, {
              id: sub._id,
            });
          } else {
            console.error("[Karyalo] Gagal kirim push ke satu subscription:", err);
          }
        }
      })
    );
  },
});

/**
 * Action publik untuk tombol "Kirim tes notifikasi" (opsional, membantu
 * admin memverifikasi setup sebelum menunggu order sungguhan) — kirim
 * payload dummy JELAS berlabel "tes", bukan berpura-pura jadi order asli
 * (§37 Coding Rule 21 tetap berlaku: tidak boleh ada fake order data yang
 * bisa disalahartikan sebagai order sungguhan).
 */
export const sendTestPushNotification = action({
  args: { endpoint: v.string() },
  handler: async (ctx, { endpoint }) => {
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error("VAPID belum di-set di Convex env — lihat CONVEX_SETUP.md.");
    }

    const subscriptions = await ctx.runQuery((internal as any).notifications.listSubscriptionsInternal, {});
    const sub = subscriptions.find((s: any) => s.endpoint === endpoint);
    if (!sub) throw new Error("Device ini belum subscribe.");

    webpush.setVapidDetails("mailto:admin@karyalo.example", vapidPublicKey, vapidPrivateKey);
    const payload = JSON.stringify({
      title: "Tes Notifikasi Karyalo Manage",
      body: "Kalau ini muncul, push notification order baru sudah siap dipakai.",
      orderId: null,
    });
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      payload
    );
  },
});
