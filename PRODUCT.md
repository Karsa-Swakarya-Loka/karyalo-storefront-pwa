# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Pelanggan / Pembeli (Shoppers):** Konsumen ritel modern di Indonesia yang mengakses toko melalui ponsel pintar (mobile-first) maupun desktop, mencari barang kebutuhan harian, F&B, fashion, atau elektronik, menginginkan navigasi yang simpel, katalog yang rapi tanpa polusi visual, dan proses checkout yang instan.
- **Pemilik Brand / Tenant Retail:** Pemilik bisnis ritel mandiri yang menginginkan etalase toko online resmi (*direct-to-consumer storefront*) berbasis PWA yang cepat, terhubung ke backend real-time Convex, dan mudah dikonfigurasi per tenant.

## Product Purpose

Menyediakan aplikasi etalase toko digital (Storefront PWA) yang cepat, bersih, dan berkinerja tinggi untuk brand/toko ritel mandiri. Mengubah proses belanja online menjadi pengalaman yang mulus seperti aplikasi native—mulai dari pencarian produk, varian, keranjang belanja, hingga checkout dan pelacakan pesanan secara real-time—tanpa kerumitan dan hiruk-pikuk marketplace konvensional.

## Positioning

Berbeda dari template toko online statis atau marketplace bertumpuk iklan, Karyalo Storefront PWA menggabungkan:
1. **Arsitektur PWA Modern (Next.js 16 + React 19 + Tailwind v4):** Dapat diinstall ke Home Screen, navigasi app shell secepat aplikasi native, dan dukungan offline fallback.
2. **Real-time Event & Order Engine (Convex Backend):** Mutasi order otoritatif langsung tersinkronisasi ke sistem inventaris dan memicu Web Push Notification seketika.
3. **Multi-Tenant Ready:** Satu fondasi kode yang dapat disesuaikan identitas brand, logo, warna, mata uang, dan fitur-fiturnya melalui konfigurasi terpusat (`tenant.ts`).

## Operating Context

- **Perangkat Akses:** Mayoritas mobile smartphone (layar sentuh, koneksi seluler 4G/5G/Wi-Fi) dengan Bottom Navigation khas aplikasi mobile; serta desktop/laptop dengan tampilan grid yang leluasa.
- **Integrasi Ekosistem:** Beroperasi sebagai etalase publik (Storefront) yang menyalurkan data pesanan dan pelanggan ke backend Convex dan ekosistem manajemen internal Karyalo.
- **Kategori Produk:** Ritel Serba Ada (General Retail) mencakup kebutuhan harian, makanan & minuman (F&B), pakaian/fashion, elektronik, dan aksesoris rumah tangga.

## Capabilities and Constraints

- **Kapabilitas Inti Terkonfirmasi:**
  - Product Discovery: Banner promosi, grid kategori visual, pencarian berbasis keyword, filter & sort.
  - Product Detail Page (PDP): Galeri visual, pemilihan varian produk, indikator rating/stok, dan rekomendasi terkait.
  - Cart & Wishlist: State management global berbasis React Context dengan persistensi lokal yang *hydration-safe*.
  - Checkout & Tracking: Single-page checkout (pengiriman, pembayaran, ringkasan) dan tracking status pesanan interaktif (Diproses, Dikirim, Selesai).
  - PWA & Push Notification: Service worker, web manifest, dan subscription notifikasi pesanan baru.
- **Batasan & Konstrain:**
  - Belum mengintegrasikan payment gateway pihak ketiga (DOKU/Midtrans) secara penuh; alur checkout saat ini berstatus direct order simulation & settlement.
  - Autentikasi akun pengguna saat ini masih dalam mode simulasi profil mock; registrasi/login penuh akan dihubungkan ke auth backend.

## Brand Commitments

- **Identitas Visual:** Palet Karyalo Blue (Navy `#0D2C54`, Royal Blue, Cyan `#00A6FB`) yang dinamis dan berakar pada logo resmi Karyalo.
- **Ikonografi:** Ikon presisi dari library `lucide-react`.
- **Gaya Tata Letak:** Bersih, lapang (*generous whitespace*), tipografi berkontras tinggi, dan satu *Call-to-Action* yang jelas per section (mengedepankan kesederhanaan dan kemudahan pemahaman bagi orang awam).

## Evidence on Hand

- Desain & Aset Terpasang: Logo resmi Karyalo (`public/logo.png`), favicon (`app/icon.png`), ikon PWA (`public/icons/`).
- Kode Berjalan: Next.js 16 App Router dengan 26 rute halaman aktif, skema backend Convex di `convex/schema.ts`, dan konfigurasi tenant di `lib/config/tenant.ts`.
- Dokumentasi Kanonik: `Karyalo_Ecommerce_Storefront_PRD_v1.0.md` dan `CONVEX_SETUP.md`.

## Product Principles

1. **Mobile-First & App-Like Speed:** Pengalaman berbelanja harus terasa seringan dan secepat aplikasi native di genggaman ponsel pengguna.
2. **Clarity Over Clutter:** Tampilan katalog dan checkout harus fokus pada produk dan kemudahan transaksi tanpa distraksi banner bertumpuk.
3. **Hydration & Offline Resilience:** Keranjang dan interaksi pengguna tidak boleh glitch saat berpindah halaman atau saat koneksi internet tidak stabil.
4. **Tenant Extensibility:** Komponen antarmuka harus modular dan adaptif terhadap berbagai jenis katalog ritel (general retail) tanpa perlu perombakan arsitektur.

## Accessibility & Inclusion

- Memenuhi standar kontras warna WCAG AA untuk keterbacaan teks pada latar terang dan gelap.
- Area sentuh target (*tap targets*) minimal 44x44px pada layar sentuh mobile.
- Penyediaan *skip-to-content links* dan navigasi yang ramah pembaca layar (screen reader).
