"use client";

import { useEffect } from "react";

/**
 * PWA-03 Service Worker — registrasi client-side. File worker-nya sendiri
 * ada di /public/sw.js (app-shell caching + offline fallback, PWA-04).
 *
 * Sengaja tidak pakai library (next-pwa dll) — lihat catatan di
 * next.config.ts. Registrasi dibungkus try/catch dan silent-skip di
 * browser yang tidak dukung `serviceWorker` (mis. beberapa in-app
 * browser) supaya tidak melempar error yang mengganggu Fase 1.
 *
 * PENTING (diperbaiki 16 Agustus 2026): SW HANYA didaftarkan di production.
 * Strategi stale-while-revalidate untuk `/_next/static/` di sw.js sengaja
 * mengandalkan nama file yang di-hash dari konten build Next.js — asumsi
 * ini SALAH saat `next dev`, karena chunk berubah terus tanpa nama file
 * berubah. Efeknya: SW menyajikan chunk basi dari cache, Next.js Fast
 * Refresh mendeteksi chunk tidak cocok lalu reload otomatis untuk
 * recovery, SW kembali menyajikan chunk basi dari cache yang sama →
 * refresh tanpa henti. Ini penyebab bug "aplikasi ter-refresh otomatis
 * terus" yang dilaporkan pemilik proyek. Di development, SW lama yang
 * mungkin sudah terlanjur ter-registrasi di browser juga di-unregister
 * otomatis + cache-nya dibersihkan supaya kondisi lama tidak menyangkut.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // Development: pastikan TIDAK ada SW aktif (baik dari sesi lama
      // maupun baru) — bersihkan registrasi + cache supaya tidak lagi
      // ikut campur dengan HMR/Fast Refresh.
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        .catch(() => {});
      if (typeof caches !== "undefined") {
        caches
          .keys()
          .then((keys) =>
            Promise.all(
              keys
                .filter((k) => k.startsWith("karyalo-shell-"))
                .map((k) => caches.delete(k))
            )
          )
          .catch(() => {});
      }
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((err) => {
      // eslint-disable-next-line no-console
      console.warn("[Karyalo] Service worker registration gagal:", err);
    });
  }, []);

  return null;
}
