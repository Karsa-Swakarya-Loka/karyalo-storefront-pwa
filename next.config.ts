import type { NextConfig } from "next";

/**
 * Fase 1 — konfigurasi minimal.
 *
 * Belum ada image domain eksternal (belum ada CDN/produk asli), belum ada
 * redirect/rewrite khusus. PWA (manifest + service worker) ditangani manual
 * di /public dan didaftarkan lewat komponen client — bukan lewat plugin
 * next-pwa — supaya tidak menambah dependency yang belum tentu kompatibel
 * dengan versi Next ini, dan supaya perilakunya eksplisit/mudah diaudit.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
