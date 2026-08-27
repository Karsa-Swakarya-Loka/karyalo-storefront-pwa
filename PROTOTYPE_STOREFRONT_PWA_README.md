# Karyalo Storefront PWA

**Status (16 Agustus 2026, update ke-3):** Fase 1 (Foundation) + mayoritas
Fase 2-6 (Discovery/PDP/Cart/Checkout/Post Purchase) sudah dibangun dengan
DATA MOCK, supaya seluruh alur bisa ditinjau visualnya sekaligus — lihat
bagian "Update — prototype end-to-end dengan data mock" di bawah. **Kode
belum pernah di-`npm build` oleh saya** (lihat catatan penting di bawah);
Anda sudah menjalankan `npm install`/`npm run dev` sebelumnya untuk Fase 1
dan belum melaporkan error compile, tapi silakan restart dev server untuk
memuat perubahan ini.
**Sumber requirement:** `Karyalo_Ecommerce_Storefront_PRD_v1.0.md` (di folder induk `Karyalo_Product_Prototype`).
**Pola/business logic diambil dari:** `Alina_ecommerce` (via `Karyalo_Store_Manage`) — lihat bagian "Apa yang diambil dari Alina" di bawah.
**Backend Convex:** disiapkan baru dari nol di folder `convex/` project ini (BUKAN reuse `Karyalo_Store_Manage/convex`) — lihat `CONVEX_SETUP.md` untuk alasan dan langkah setup lengkap.

Ini adalah implementasi **baru**, terpisah dari `Karyalo_Store_Manage/storefront`
(hasil rebrand statis HTML dari Alina). Storefront lama TETAP ADA dan tidak
disentuh — masih berfungsi sebagai referensi/demo cadangan sesuai keputusan
Anda. Folder ini ("Karyalo_Storefront_PWA") adalah jalur pengembangan baru
yang akan menggantikannya secara bertahap begitu memenuhi requirement PRD
(SSR, PWA, multi-tenant) yang tidak bisa dipenuhi arsitektur statis lama.

---

## ⚠️ Catatan penting — belum tervalidasi

Sandbox tempat saya menulis kode ini **tidak punya akses ke registry npm**
(kebijakan jaringan sandbox, bukan masalah di sisi Anda), jadi saya **tidak
bisa menjalankan `npm install` atau `npm run build`** untuk memvalidasi kode
ini benar-benar compile tanpa error. Saya sudah:

- Cek manual setiap file (kurung kurawal/kurung biasa seimbang).
- Cek semua import `@/...` mengarah ke file yang benar-benar ada.
- Menulis mengikuti konvensi Next.js App Router yang stabil (bukan API eksperimental).

Tapi ini **bukan pengganti compile sungguhan**. Kemungkinan ada TypeScript
error kecil yang baru ketahuan saat `npm run build` di komputer Anda. Kalau
itu terjadi: **salin pesan errornya ke saya, saya perbaiki.** Ini bagian
normal dari alur kerja saat saya tidak bisa build-test sendiri, bukan tanda
kodenya asal-asalan.

## Cara menjalankan

1. Salin folder ini ke lokasi yang Anda mau (lihat bagian pengiriman file).
2. `cd` ke folder ini di terminal.
3. `npm install`
4. `npm run dev`
5. Buka `http://localhost:3000`

Yang akan Anda lihat: header + bottom navigation + footer sudah aktif dan
konsisten di semua halaman (branding "Karyalo" placeholder — logo asli belum
ada), tapi isi tiap halaman masih placeholder "Fase 2/3/dst — belum
dibangun" karena scope Fase 1 memang hanya fondasi, bukan fitur. Coba klik
navigasi bawah (mobile) atau menu atas (desktop) untuk lihat semua rute
sudah terdaftar sesuai PRD §47.

---

## Apa yang sudah dibangun (Fase 1 — Foundation, sesuai PRD §52)

| Requirement PRD §52 | Implementasi |
|---|---|
| App shell | `app/layout.tsx` — header, bottom nav, footer, skip-link aksesibilitas |
| Routing | Semua 26 rute dari PRD §47 terdaftar (isi placeholder, lihat `components/system/RouteStub.tsx`) |
| Design tokens | `app/globals.css` — token warna/tipografi persis dari `Karyalo_Design_System.md` §2-§3, via Tailwind v4 `@theme` |
| Responsive layout | Mobile-first; bottom nav mobile-only, nav penuh desktop (`md:`) |
| Header | `components/layout/AppHeader.tsx` — logo, search, wishlist/account/cart (PRD §10) |
| Bottom navigation | `components/layout/BottomNavigation.tsx` — 5 item, active state, badge cart, sembunyi di `/checkout` (PRD §9.1) |
| API client layer | `lib/convex/ConvexClientProvider.tsx` — siap pakai begitu ada Convex URL, tidak crash bila kosong |
| State handling | `lib/cart/cart-context.tsx` — cart state + persist localStorage, hydration-safe |
| Error boundary | `app/error.tsx` (per-halaman) + `app/global-error.tsx` (root layout) |
| PWA baseline | `public/manifest.json`, `public/sw.js`, ikon placeholder, registrasi service worker |

## Apa yang diambil dari Alina (pola, bukan kode mentah)

Sesuai permintaan Anda ("penyesuaian yg ada di alina juga"), beberapa
keputusan desain di sini secara sadar meniru pola yang sudah terbukti jalan
di production Alina — bukan disalin baris-per-baris (bahasa/arsitekturnya
beda total: vanilla JS vs React), tapi konsepnya dipertahankan:

- **Bottom sticky navigation** dengan badge cart — Alina punya
  `alina-bottom-dock.js` untuk pola serupa (dock/sticky bar).
- **Cart persist ke localStorage untuk guest** — pola yang sama dengan
  `alina-cart.js`, di sini diimplementasikan lewat React context + reducer.
- **Konfigurasi runtime terpisah dari kode** — Alina punya `alina-config.js`
  sebagai satu titik config; di sini perannya digantikan `lib/config/tenant.ts`
  (lebih maju: sudah bertipe TypeScript dan terstruktur untuk multi-tenant
  sesuai PRD §38, bukan cuma satu toko).
- **Deteksi dev vs prod dari environment, bukan hardcode** — pola yang sama
  dengan `admin_dashboard/app/deployment-target.ts` di Karyalo_Store_Manage.

Business logic yang lebih dalam (perhitungan harga, validasi stok, alur
DOKU/Biteship) **belum** dipindahkan — itu ranah Fase 3-5 (PDP/Cart/Checkout)
dan akan memakai backend Convex yang sama seperti Karyalo_Store_Manage
(bukan dibangun ulang dari nol), begitu Convex project untuk prototype ini
sudah ada.

## Update 16 Agustus 2026 — logo asli, palet biru, ikon lucide-react

Setelah Fase 1 ditulis, Anda mengirim materi desain nyata ke `07_DESIGN`
(logo + 5 referensi kompetitor fashion). Perubahan yang sudah diterapkan:

- **Logo asli terpasang** — `public/logo.png` (diambil dari
  `07_DESIGN/Logo/logo_karyalo.png`), dipakai sungguhan di header
  (`lib/config/tenant.ts` — `branding.logoUrl: "/logo.png"`, bukan lagi
  `null`). Ikon PWA (`public/icons/icon-192.png`, `icon-512.png`,
  `icon-maskable-512.png`) dan favicon (`app/icon.png`) juga digenerate
  ulang dari logo asli ini (bukan lagi placeholder huruf "K").
- **Palet warna diganti dari hijau ke biru** — logo asli ternyata pita
  gradasi navy → royal blue → cyan, BUKAN hijau seperti placeholder Fase 1
  (yang disalin apa adanya dari `Karyalo_Design_System.md`, dokumen yang
  ternyata sumbernya adalah Company Profile PRD untuk website karyalo.com,
  bukan produk). Sesuai permintaan Anda ("palette warna sesuaikan dengan
  logo agar tidak bentrok dan eye catching"), token warna di
  `app/globals.css` diganti ke nilai biru yang diekstrak dari logo, dengan
  kontras WCAG dihitung ulang untuk tiap kombinasi (lihat komentar di file
  itu). Detail lengkap + rationale ada di `Karyalo_Design_System.md` §11
  (bagian baru, khusus produk Store — website corporate TIDAK ikut
  berubah). Nama class Tailwind (`text-deep-pine`, `bg-karyalo-green`, dst.)
  SENGAJA tidak diganti supaya tidak ada risiko typo/class putus di seluruh
  komponen — anggap sebagai nama "slot", bukan deskripsi warna literal lagi.
- **Ikon: lucide-react** — SVG inline hand-drawn di Fase 1 (header, bottom
  nav, cart, search) diganti `lucide-react@^1.23.0`, versi persis sama
  dengan yang dipakai `admin_dashboard`, sesuai konfirmasi Anda ("poin 5
  samakan saja"). Ditambahkan ke `package.json` — **jalankan `npm install`
  lagi** supaya package-nya benar-benar terunduh sebelum `npm run dev`.
- **Vertikal produk: fashion** — dicatat untuk jadi acuan data mock/demo di
  Fase 2 (belum ada halaman yang butuh ini di Fase 1).
- **Arah layout Fase 2 (dari 5 referensi di `07_DESIGN/Prototype/`)** —
  sesuai instruksi Anda ("mudah dipahami orang awam, tidak terlalu kompleks
  seperti marketplace pada umumnya"): Zalora dan Lancôme dipakai sebagai
  acuan utama (grid kategori bersih dengan foto besar, satu CTA per section,
  banyak whitespace, tipografi jadi elemen desain, bukan cuma dekorasi).
  AliExpress/Flipkart/OLX dilihat sebagai contoh KEBALIKAN yang harus
  dihindari (banner bertumpuk, terlalu banyak warna kontras bersaing,
  section padat tanpa jeda) — bukan untuk ditiru.

## Update 16 Agustus 2026 (lanjutan) — prototype end-to-end dengan data mock

Atas permintaan Anda ("bisa buat keseluruhan untuk dapat meninjau prototype
lengkapnya"), 26 dari 27 rute PRD §47 sekarang punya konten sungguhan (bukan
`RouteStub` lagi), pakai DATA MOCK bertipe sesuai izin eksplisit PRD §52.
Arah layout yang dijelaskan di update sebelumnya (Zalora/Lancôme, bukan
gaya marketplace padat) sudah diimplementasikan, bukan cuma dicatat sebagai
rencana.

**Yang sepenuhnya berfungsi (state di browser, belum ke backend):**
- **Homepage** (`/`) — hero, grid 5 kategori, rekomendasi produk, banner
  promo tunggal, baru tiba, paling laris, trust badges.
- **PLP** (`/category`, `/category/[slug]`) — grid produk, chip kategori,
  sort sederhana (Terbaru/Terlaris/Harga).
- **Search** (`/search?q=...`) — cocok substring pada nama/kategori/
  deskripsi (`lib/data/products.ts#searchProducts`).
- **PDP** (`/product/[slug]`) — galeri, pilih varian (ukuran/warna),
  kuantitas, tambah ke keranjang, wishlist toggle, produk serupa.
- **Cart** (`/cart`) — item, ubah kuantitas, hapus, ringkasan harga; state
  dari `cart-context.tsx` yang sudah ada sejak Fase 1 (localStorage).
- **Wishlist** (`/wishlist`) — toggle dari ProductCard/PDP, context baru
  `lib/wishlist/wishlist-context.tsx` (pola sama persis dengan cart).
- **Checkout** (`/checkout` → `/checkout/success`) — satu halaman (bukan
  wizard, sesuai arahan "sederhana"): alamat, metode kirim, metode bayar,
  ringkasan, submit. **Ini SIMULASI** — tidak ada validasi ongkir/stok
  nyata, tidak ada payment gateway (DOKU ditunda sesuai arahan Anda), dan
  "pesanan" TIDAK tersimpan sebagai catatan otoritatif di manapun — cuma
  dititipkan sebentar ke `sessionStorage` supaya halaman sukses berikutnya
  bisa menampilkan ringkasannya (lihat komentar detail di
  `app/checkout/page.tsx` soal kenapa ini tidak melanggar §53 no-
  localStorage-as-order-store).
- **Order tracking** (`/order/[id]`, `/account/orders`,
  `/account/orders/[id]`) — 3 pesanan contoh di `lib/data/orders.ts`
  dengan status berbeda (Diproses/Dikirim/Selesai) + timeline visual.
- **Account** (`/account` dan sub-halamannya) — profil, alamat, pesanan
  memakai profil MOCK ("Budi Santoso") karena **belum ada autentikasi
  sungguhan** — /login dan /register cuma tampilan form, submit tidak
  diproses. Ini supaya sub-halaman akun bisa ditinjau isinya, bukan cuma
  layar "silakan login".

**Yang halamannya ada tapi sengaja apa adanya (bukan bug):**
- `/flash-sale/[slug]` menampilkan status "belum aktif" — `featureFlags.
  flashSale` di `lib/config/tenant.ts` memang masih `false`, jadi halaman
  ini SENGAJA tidak berpura-pura ada flash sale dengan countdown palsu.
- `/privacy` dan `/terms` berisi teks boilerplate generik dengan banner
  "DRAFT — belum ditinjau tim legal" yang tampil jelas di halaman — BUKAN
  kebijakan resmi, jangan dipakai tanpa ditinjau ulang.
- Rating/ulasan pada ProductCard/PDP cuma angka ringkasan dari data mock
  (bintang + jumlah) — BUKAN fitur "Reviews" penuh (tulis ulasan, daftar
  ulasan) yang memang masih `featureFlags.reviews: false`.

**Foto produk:** semua gambar di `public/images/products`,
`public/images/categories`, `public/images/misc` adalah placeholder
bergambar ikon "foto" generik di atas warna brand (dibuat terprogram),
BUKAN foto produk sungguhan — belum ada sesi foto. Cukup untuk meninjau
layout/komposisi, tapi ganti dengan foto asli sebelum ini jadi produk
nyata.

**Data mock terpusat** (satu-satunya sumber, jangan ditulis ulang di
komponen lain): `lib/data/products.ts` (18 produk fashion, 5 kategori)
dan `lib/data/orders.ts` (3 pesanan contoh). Keduanya sudah ditulis
dengan fungsi `async` (`getAllProducts()`, dst.) supaya migrasi ke query
Convex nanti tidak mengubah pemanggilnya — cuma isi fungsi yang diganti.

## Update 16 Agustus 2026 (lanjutan lagi) — data sekarang membaca Convex

Setelah Anda berhasil `npx convex dev` + `npx convex run seed:seedAll`
(`{ inserted: { categories: 5, products: 18, orders: 3 } }`), fungsi di
`lib/data/products.ts` dan `lib/data/orders.ts` sudah disambungkan ke
Convex (`convex/products.ts`/`categories.ts`/`orders.ts`, lihat
`CONVEX_SETUP.md`). Halaman `app/*` **tidak perlu ditulis ulang** — semua
sudah manggil fungsi yang sama seperti sebelumnya, cuma isi fungsinya
yang sekarang membaca Convex dulu.

**Cara kerja fallback (penting):** tiap fungsi (`getAllProducts`,
`getProductBySlug`, dst.) mencoba Convex lebih dulu; kalau
`NEXT_PUBLIC_CONVEX_URL` kosong ATAU query-nya gagal (mis. deployment lagi
mati), otomatis balik ke array mock statis dan cetak warning di console
browser: `[Karyalo] Convex query "..." gagal, fallback ke mock data`.
Jadi kalau setelah restart `npm run dev` Anda melihat data yang sama
persis seperti sebelumnya (bukan yang baru Anda ubah di dashboard Convex,
kalau ada), buka console browser dan cek warning ini dulu — itu tandanya
belum benar-benar baca dari Convex.

**Yang berubah di balik layar (bukan di halaman):**
- ID produk/pesanan sekarang ID Convex asli (`_id`, bukan lagi "p01"/
  "ord-1001"), dipetakan ke field `id` yang sudah dipakai UI supaya
  komponen tidak perlu tahu bedanya.
- `/wishlist` (satu-satunya halaman client component yang butuh data
  produk) dipecah jadi dua varian kecil di `app/wishlist/page.tsx` — satu
  pakai `useQuery` Convex, satu pakai mock — dipilih otomatis berdasarkan
  `NEXT_PUBLIC_CONVEX_URL`, bukan Anda yang perlu pilih manual.
- `generateStaticParams` di halaman `[slug]`/`[id]` (produk, kategori,
  order) sekarang `async` dan membaca daftar dari fungsi yang sama —
  tapi ini cuma daftar build-time, halaman yang ID/slug-nya tidak masuk
  daftar itu tetap bisa diakses langsung (Next.js `dynamicParams`
  default aktif).

**Belum disambungkan (sengaja, di luar scope sekarang):** cart MASIH
localStorage seperti sebelumnya. Wishlist tetap localStorage untuk
daftar ID-nya sendiri, hanya detail produknya yang sekarang ambil dari
Convex. Checkout — lihat update di bawah, ini SUDAH berubah.

**Belum tervalidasi dari sisi saya** — sama seperti sebelumnya, saya
tidak bisa menjalankan `npm run dev`/`next build` dari sandbox saya.
Kalau setelah restart ada error di terminal atau browser (termasuk
terkait `convex/_generated` atau tipe TypeScript), salin pesan errornya
untuk saya perbaiki.

## Update 16 Agustus 2026 (lanjutan lagi lagi) — checkout menyimpan order sungguhan + push notification ke Manage

Dipicu pertanyaan pemilik proyek: *"apakah ketika ada pemesanan di
storefront, sisi Manage akan dapat push notifikasi?"* — sebelumnya
jawabannya tidak bisa (checkout cuma simulasi sessionStorage, tidak ada
event apa pun yang bisa dipicu). Sekarang:

- `/checkout` memanggil mutation `orders.create` (`convex/orders.ts`)
  yang benar-benar menyimpan order ke Convex — order ini SEKARANG
  otoritatif sungguhan (bukan lagi cuma sessionStorage; §53 "no
  authoritative order in localStorage" akhirnya dipatuhi penuh untuk
  bagian ini). `sessionStorage` tetap dipakai, tapi sekarang cuma
  hand-off UI ke halaman sukses, bukan satu-satunya catatan.
- Setelah insert, `orders.create` menjadwalkan action
  `notificationActions.sendOrderPushNotification` yang mengirim Web Push
  ke semua admin Karyalo Manage yang sudah subscribe (lewat
  `karyalo-manage-pwa`, `/settings/notifications`) — format & alur
  persis PRD Manage §16.3/16.4. Detail setup (VAPID keys, env var) ada di
  `CONVEX_SETUP.md` bagian "Setup Web Push".
- Kegagalan simpan order/kirim push TIDAK menghentikan alur checkout di
  UI (tetap lanjut ke halaman sukses) — dicetak sebagai `console.warn`,
  konsisten dengan pola fallback yang sudah dipakai di seluruh
  `lib/data/*.ts`. Ini demi prototype tetap bisa di-demo walau
  backend/push sedang bermasalah, BUKAN berarti kegagalan itu diam-diam
  disembunyikan dari developer.
- Payment/ongkir TETAP simulasi (DOKU/Biteship masih ditunda pemilik
  proyek) — yang berubah cuma penyimpanan order + trigger notifikasi.

**Belum tervalidasi dari sisi saya** — sama seperti bagian lain,
memerlukan `npm install` ulang (dependency baru `web-push`) + setup
VAPID key di Convex env sebelum bisa dites (lihat CONVEX_SETUP.md).

## Yang belum dikerjakan / keputusan yang diambil (dicatat, bukan disembunyikan)

- **Font:** dipilih **Inter Variable** dari 2 opsi yang diizinkan Design
  System (Inter atau Manrope) — keputusan praktis untuk membuat progres,
  bukan requirement baru. Bisa diganti ke Manrope dengan mengubah satu baris
  di `app/layout.tsx`.
- **Convex:** belum terhubung ke deployment nyata — `NEXT_PUBLIC_CONVEX_URL`
  kosong di `.env.local.example`. Semua halaman fitur (Fase 2+) akan butuh
  ini begitu mulai dikerjakan.
- **Domain, DOKU, Biteship, Resend:** masih sama seperti tercatat di
  `Karyalo_Store_Manage/PROTOTYPE_README.md` — ditunda sesuai arahan Anda.
- **Kontras warna & component states (hover/focus/error/disabled):** kontras
  brand utama (navy/royal blue/ink/muted vs Warm White) sudah dihitung ulang
  (lihat `app/globals.css`), tapi state per-komponen (hover/focus/error/
  disabled) untuk komponen Fase 2+ tetap belum didefinisikan — gap ini
  sudah ada sejak Design System sumber (§5, §9) dan belum tertutup.
- **Autentikasi:** `/login` dan `/register` cuma tampilan form, belum
  memproses apapun; halaman Akun memakai profil mock. TODO integrasi:
  Convex Auth atau setara begitu backend ada.
- **Checkout adalah simulasi**, bukan transaksi nyata — lihat detail di
  bagian "prototype end-to-end dengan data mock" di atas.

## Rencana fase berikutnya (mengikuti PRD §52 apa adanya)

1. **Fase 2 — Discovery:** Homepage (§11), PLP/Category (§12), Search (§14), `ProductCard` (§13).
2. **Fase 3 — PDP:** Galeri, varian, harga, promo, sticky CTA (§15).
3. **Fase 4 — Cart:** UI `/cart`, voucher, free shipping progress (§17).
4. **Fase 5 — Checkout:** Guest checkout, alamat, shipping, payment (§19-21).
5. **Fase 6 — Post Purchase:** Order detail/tracking, account, wishlist sync (§22-24).
6. **Fase 7 — Optimization:** PWA install UX, push, performance, SEO, a11y, analytics (§33-36, §42-43).

Tiap fase idealnya baru mulai setelah fase sebelumnya di-review dan
node_modules/build sudah diverifikasi jalan di komputer Anda — supaya kalau
ada kesalahan pola di fondasi, ketahuan sebelum menyebar ke banyak halaman.
