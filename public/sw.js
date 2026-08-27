/**
 * Karyalo Storefront — service worker (PWA-03/PWA-04/PWA-05).
 *
 * Strategi sengaja sederhana untuk Fase 1 (Foundation):
 *   - Precache: app shell minimal (offline fallback page + manifest + icons).
 *   - Navigasi (HTML): network-first, fallback ke /offline saat gagal.
 *     TIDAK pernah menyajikan halaman /checkout dari cache — PWA-04
 *     eksplisit melarang "pretend to complete offline" untuk pembayaran.
 *   - Aset statis (_next/static, gambar, ikon): stale-while-revalidate —
 *     aman di-cache karena Next.js menamai file build dengan hash konten.
 *
 * Versioning cache manual lewat CACHE_NAME — naikkan angka versi ini tiap
 * kali strategi caching berubah, supaya klien lama tidak tersangkut di
 * cache basi (PWA-07 App Update).
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `karyalo-shell-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [OFFLINE_URL, "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("karyalo-shell-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Jangan pernah campur tangan pada request checkout/payment/API — harus
  // selalu hit network langsung, tidak boleh disajikan dari cache basi.
  if (
    url.pathname.startsWith("/checkout") ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  // Navigasi halaman (HTML): network-first, fallback offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((res) => res ?? Response.error())
      )
    );
    return;
  }

  // Aset statis Next.js (nama file di-hash dari konten -> aman cache lama).
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached ?? networkFetch;
      })
    );
  }
});
