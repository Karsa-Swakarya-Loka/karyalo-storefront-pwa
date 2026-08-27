# 🛍️ Karyalo Storefront PWA

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Convex](https://img.shields.io/badge/Convex-1.42.1-FF4F00?style=flat-square&logo=convex)](https://convex.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)

**Karyalo Storefront PWA** adalah aplikasi *e-commerce storefront* modern berbasis Next.js App Router dengan arsitektur **Mobile-First Progressive Web App (PWA)** dan backend real-time **Convex**. Dibangun berdasarkan spesifikasi PRD Karyalo E-Commerce Storefront dengan mengutamakan performa tinggi, kemudahan navigasi, dan kesiapan multi-tenant.

---

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Panduan Instalasi & Menjalankan](#-panduan-instalasi--menjalankan)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Konfigurasi Multi-Tenant](#-konfigurasi-multi-tenant)
- [Integrasi Convex & Web Push](#-integrasi-convex--web-push)
- [Daftar Script npm](#-daftar-script-npm)
- [Alur Kontribusi Git](#-alur-kontribusi-git)

---

## ✨ Fitur Utama

- 📱 **Mobile-First & PWA**:
  - Tampilan responsif optimal untuk layar *smartphone* dan desktop.
  - App Shell dengan Bottom Navigation khas aplikasi mobile (tersembunyi otomatis di alur checkout).
  - Web App Manifest & Service Worker (`/public/sw.js`) untuk kemampuan install ke *Home Screen* dan caching offline dasar.
- 🔍 **Product Discovery & Katalog**:
  - **Homepage**: Hero banner promo, grid kategori visual, produk terbaru, dan rekomendasi terlaris.
  - **PLP (Product Listing Page)**: Grid produk interaktif, filter kategori, dan pengurutan (Terbaru, Terlaris, Harga).
  - **Pencarian Cepat**: Pencarian real-time berbasis nama, kategori, dan deskripsi produk.
  - **PDP (Product Detail Page)**: Galeri foto produk, pemilihan varian (warna & ukuran), rating bintang, dan rekomendasi produk terkait.
- 🛒 **Cart & Wishlist State Management**:
  - Global React Context (`CartContext` & `WishlistContext`) yang persisten di `localStorage`.
  - Penanganan *hydration-safe* untuk mencegah *SSR mismatch* di Next.js.
- 💳 **Checkout Flow & Order Tracking**:
  - Single-page checkout (Alamat pengiriman, pilihan kurir, metode pembayaran, ringkasan belanja).
  - Tracking status pesanan interaktif (`/order/[id]` & `/account/orders/[id]`) dengan timeline (Diproses, Dikirim, Selesai).
- ⚡ **Real-Time Backend (Convex)**:
  - Database schema terstruktur untuk `products`, `categories`, `orders`, dan `pushSubscriptions`.
  - Integrasi mutasi order otoritatif dan Web Push notification.

---

## 🛠 Tech Stack

| Lapisan | Teknologi |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`) |
| **Ikon** | [Lucide React](https://lucide.dev/) (`lucide-react`) |
| **Backend & DB** | [Convex 1.42](https://convex.dev/) (Cloud Real-Time DB & Serverless Functions) |
| **Push Notification** | [Web-Push](https://github.com/web-push-libs/web-push) & Service Worker API |

---

## 📂 Struktur Folder

```text
karyalo-storefront-pwa/
├── app/                           # Next.js App Router (Rute & Halaman)
│   ├── account/                   # Halaman Akun, Profil, Alamat & Daftar Pesanan
│   ├── cart/                      # Halaman Keranjang Belanja
│   ├── category/                  # PLP (Kategori & [slug])
│   ├── checkout/                  # Alur Checkout & Konfirmasi Sukses
│   ├── help/                      # Pusat Bantuan, Pengiriman, Pembayaran & Retur
│   ├── order/[id]/                # Pelacakan Pesanan Publik
│   ├── product/[slug]/            # PDP (Halaman Detail Produk)
│   ├── search/                    # Halaman Pencarian Produk
│   ├── wishlist/                  # Halaman Daftar Keinginan (Wishlist)
│   ├── layout.tsx                 # Root Layout (App Shell, Providers, Header & Footer)
│   ├── globals.css                # Tailwind CSS v4 Theme Tokens
│   └── error.tsx / global-error   # Error Boundaries
│
├── components/                    # Reusable React Components
│   ├── layout/                    # Header, Bottom Navigation, Footer, Breadcrumb
│   ├── order/                     # Komponen Detail & Badge Status Pesanan
│   ├── product/                   # ProductCard, ProductGrid, ProductDetail, RatingStars
│   └── system/                    # ServiceWorkerRegister, RouteStubs
│
├── convex/                        # Backend Convex (Functions & Schemas)
│   ├── schema.ts                  # Skema Database (products, categories, orders, subscriptions)
│   ├── products.ts                # Query & Mutasi Produk
│   ├── categories.ts              # Query Kategori
│   ├── orders.ts                  # Query & Mutasi Pesanan
│   ├── notifications.ts           # Manajemen Subscription Web Push
│   ├── notificationActions.ts     # Action Pengiriman Notifikasi Push
│   └── seed.ts                    # Script Seeding Data Awal
│
├── lib/                           # Helper, Konfigurasi & State
│   ├── cart/                      # Cart Context & Reducer (localStorage persist)
│   ├── wishlist/                  # Wishlist Context (localStorage persist)
│   ├── config/tenant.ts           # Konfigurasi Multi-Tenant (Branding, Fitur, Kontak)
│   ├── convex/                    # Convex Client Provider
│   ├── data/                      # Data Mock & Helper (Products & Orders)
│   └── utils/                     # Formatting mata uang (IDR) & utilitas
│
├── public/                        # Static Assets (Logo, Ikon PWA, Manifest, SW)
│   ├── icons/                     # Ikon PWA (192px, 512px, maskable)
│   ├── images/                    # Placeholder gambar produk, kategori, hero banner
│   ├── manifest.json              # Web App Manifest PWA
│   ├── sw.js                      # Service Worker
│   └── logo.png                   # Logo Utama Brand
│
├── CONVEX_SETUP.md                # Dokumentasi Detail Backend Convex & Web Push
├── next.config.ts                 # Konfigurasi Next.js
├── package.json                   # Dependensi & Script Project
└── tsconfig.json                  # Konfigurasi TypeScript
```

---

## 📋 Prasyarat Sistem

Sebelum menjalankan proyek, pastikan lingkungan pengembangan Anda sudah terpasang:
- **Node.js**: Versi `20.x` atau lebih baru
- **npm**: Versi `10.x` atau lebih baru (atau `pnpm` / `yarn`)
- **Akun Convex**: [Convex Dashboard](https://dashboard.convex.dev/) (jika ingin deploy/menghubungkan backend dev sendiri)

---

## 🚀 Panduan Instalasi & Menjalankan

### 1. Kloning Repository
```bash
git clone https://github.com/Karsa-Swakarya-Loka/karyalo-storefront-pwa.git
cd karyalo-storefront-pwa
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Setup File Environment
Salin template `.env.local.example` menjadi `.env.local`:
```bash
cp .env.local.example .env.local
```
Sesuaikan nilai variabel lingkungan di `.env.local` (lihat bagian [Konfigurasi Environment](#-konfigurasi-environment)).

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Konfigurasi Environment

File `.env.local` digunakan untuk menyimpan kredensial deployment Convex dan Web Push. Contoh isi file `.env.local`:

```env
# Convex Backend Deployment
CONVEX_DEPLOYMENT=dev:moonlit-porcupine-488

# Convex Public URLs
NEXT_PUBLIC_CONVEX_URL=https://moonlit-porcupine-488.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://moonlit-porcupine-488.convex.site

# Web Push VAPID Public Key (opsional untuk push notification di browser)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_vapid_key_here
```

> **Catatan Keamanan:** Jangan pernah melakukan commit file `.env.local` ke Git. File ini sudah otomatis diabaikan oleh `.gitignore`.

---

## 🏢 Konfigurasi Multi-Tenant

Pengaturan nama toko, identitas visual, kontak, dan *feature flags* dikelola secara terpusat di file [`lib/config/tenant.ts`](./lib/config/tenant.ts).

Contoh pengaturan yang dapat disesuaikan per tenant:
```typescript
export const tenantConfig = {
  tenantId: "karyalo-default",
  name: "Karyalo Store",
  tagline: "Fashion Pilihan untuk Gaya Terbaikmu",
  currency: {
    code: "IDR",
    symbol: "Rp",
    locale: "id-ID",
  },
  branding: {
    logoUrl: "/logo.png",
    primaryColor: "#0D2C54",
    accentColor: "#00A6FB",
  },
  featureFlags: {
    wishlist: true,
    reviews: false,
    flashSale: false,
    guestCheckout: true,
    liveChat: false,
  },
  contacts: {
    whatsapp: "+6281234567890",
    email: "support@karyalo.com",
    address: "Jakarta, Indonesia",
  }
};
```

---

## 🗄️ Integrasi Convex & Web Push

Folder `convex/` berisi backend serverless untuk data real-time:
- **Menjalankan Convex Dev Server lokal:**
  ```bash
  npx convex dev
  ```
- **Seeding Data Awal ke Convex:**
  ```bash
  npx convex run seed:seedAll
  ```
- **Web Push Notification:**
  Untuk mengaktifkan pengiriman notifikasi pesanan ke admin/perangkat, generate VAPID keys dan set environment variable di dashboard Convex:
  ```bash
  npx web-push generate-vapid-keys
  ```
  *(Baca panduan lengkap setup Convex di file [`CONVEX_SETUP.md`](./CONVEX_SETUP.md)).*

---

## 📜 Daftar Script npm

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan Next.js development server pada port 3000 (Turbopack) |
| `npm run build` | Membuat build produksi teroptimasi |
| `npm run start` | Menjalankan server produksi hasil build |
| `npm run lint` | Menjalankan pemeriksaan linter ESLint |

---

## 🌿 Alur Kontribusi Git

Bagi tim pengembang yang ingin menambahkan fitur atau memperbaiki bug:

1. Pastikan branch `main` Anda adalah yang terbaru:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Buat branch fitur baru dengan penamaan standar:
   - Fitur baru: `feat/nama-fitur` (contoh: `feat/checkout-payment-gateway`)
   - Perbaikan bug: `fix/nama-bug` (contoh: `fix/cart-quantity-overflow`)
   - Refactor/Chore: `refactor/nama-perubahan`
   ```bash
   git checkout -b feat/nama-fitur
   ```
3. Lakukan commit dengan pesan yang jelas (mengikuti konvensi Conventional Commits).
4. Push branch ke remote dan buat **Pull Request (PR)** ke branch `main`.

---

© 2026 **Karsa Swakarya Loka** — All Rights Reserved.
