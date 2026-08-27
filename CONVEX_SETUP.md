# Setup Convex — Karyalo Storefront PWA

**Keputusan 16 Agustus 2026:** backend Convex untuk prototype ini dimulai
**baru dari nol**, terpisah total dari `Karyalo_Store_Manage/convex`
(backend Alina yang belum digeneralisasi — lihat peringatan di bawah).
Folder `convex/` di project INI (`Karyalo_Storefront_PWA`) adalah
implementasi baru, dibuat 16 Agustus 2026.

## ⚠️ Kenapa tidak reuse `Karyalo_Store_Manage/convex`

Saat meninjau folder itu untuk menjawab pertanyaan Anda, saya menemukan
`Karyalo_Store_Manage/scripts/start.sh` **secara default menyambungkan
Convex ke OMS (sistem gudang) LIVE milik Alina**
(`OMS_HOSTED_URL="https://oms.alinaofficial.store"`) dan otomatis
men-sync env var itu ke Convex tiap kali `npm run dev` dijalankan di
folder itu. Backend-nya sendiri (`admin.ts` 145KB, `http.ts` 116KB, dst.)
juga masih 100% logika bisnis Alina, belum ditinjau/digeneralisasi sama
sekali. Anda memilih untuk TIDAK memakai ini sebagai basis — prototype
ini punya backend sendiri yang ringan, seperti di bawah.

**Jangan jalankan `npm run dev` di folder `Karyalo_Store_Manage` sampai
`scripts/start.sh` ditinjau ulang** (item ini dicatat di
`04_PROJECT_CHANGELOG.md` sebagai open item baru).

## Apa yang sudah disiapkan di `convex/` folder ini

- `schema.ts` — 4 tabel: `products`, `categories`, `orders`,
  `pushSubscriptions` (baru — lihat bagian Web Push di bawah). Bentuk
  `products`/`categories`/`orders` sengaja meniru persis shape data mock
  di `lib/data/products.ts` dan `lib/data/orders.ts`, supaya migrasi
  nanti tinggal ganti isi fungsi di file itu, bukan menulis ulang halaman.
- `products.ts`, `categories.ts` — query functions (baca saja).
- `orders.ts` — query functions **+ mutation `create` (baru, 16 Agustus
  2026)** — ini SEKARANG order store otoritatif sungguhan, dipanggil dari
  `/checkout` (bukan lagi murni sessionStorage), dan yang memicu push
  notification lewat `notificationActions.ts`.
- `notifications.ts` / `notificationActions.ts` (baru) — penyimpanan Web
  Push subscription admin Manage + pengiriman notifikasi order baru.
  Lihat bagian "Setup Web Push" di bawah — ini WAJIB langkah tambahan,
  tidak otomatis aktif hanya dengan `npx convex dev`.
- `seed.ts` — mutation `seedAll` untuk mengisi data awal (18 produk, 5
  kategori, 3 pesanan contoh) sekali saja, idempotent.

**PENTING — belum divalidasi:** persis seperti kode Next.js-nya, saya
tidak bisa menjalankan `npx convex dev` dari sandbox saya (tidak ada
akses jaringan ke Convex/npm). Kode di atas ditulis mengikuti pola Convex
standar (schema + query + mutation) tapi belum pernah benar-benar
di-deploy. Kemungkinan ada kesalahan kecil yang baru ketahuan saat Anda
menjalankannya — kalau itu terjadi, salin pesan errornya ke saya.

## Langkah setup (jalankan di terminal Anda)

1. **Pastikan di folder yang benar:**
   ```
   cd path\ke\karyalo-storefront-pwa
   ```
   (folder yang sama tempat Anda menjalankan `npm run dev` selama ini —
   `package.json` di sini sudah punya dependency `convex`.)

2. **Jalankan Convex dev server:**
   ```
   npx convex dev
   ```
   Ini akan:
   - Membuka browser untuk login/daftar ke Convex (gratis untuk tier dev).
   - Menanyakan mau buat project baru — pilih nama sesuai selera (mis.
     "karyalo-storefront").
   - Otomatis membuat folder `convex/_generated/` (tipe TypeScript hasil
     codegen dari `schema.ts` — JANGAN diedit manual) dan mengisi
     `.env.local` dengan `CONVEX_DEPLOYMENT` + `NEXT_PUBLIC_CONVEX_URL`.
   - Mendeploy `schema.ts` dan semua fungsi di `products.ts`/
     `categories.ts`/`orders.ts`/`seed.ts` ke deployment dev Anda.
   - Tetap berjalan di terminal (watch mode) — biarkan terbuka, jangan
     ditutup selama development, mirip `npm run dev`.

3. **Isi data awal (di terminal LAIN, biarkan `npx convex dev` tetap jalan):**
   ```
   npx convex run seed:seedAll
   ```
   Harusnya keluar `{ skipped: false, inserted: { categories: 5, products: 18, orders: 3 } }`.
   Kalau keluar `{ skipped: true, ... }`, berarti sudah pernah di-seed
   sebelumnya — aman, tidak dobel insert.

4. **Cek `.env.local`** — pastikan `NEXT_PUBLIC_CONVEX_URL` sudah terisi
   otomatis oleh langkah 2 (biasanya `https://xxx.convex.cloud`).

5. **Restart `npm run dev`** (proses Next.js-nya, di terminal ketiga atau
   setelah `npx convex dev` jalan) supaya `NEXT_PUBLIC_CONVEX_URL` yang
   baru terbaca.

6. **Selesai — 16 Agustus 2026:** setelah Anda konfirmasi seed berhasil
   (`{ inserted: { categories: 5, products: 18, orders: 3 } }`),
   `lib/data/products.ts` dan `lib/data/orders.ts` sudah disambungkan ke
   query Convex di atas (fallback otomatis ke mock kalau Convex belum
   siap/gagal — lihat komentar header kedua file). Restart `npm run dev`
   supaya perubahan terbaca, lalu cek halaman Homepage/PLP/PDP/Wishlist —
   kalau datanya masih identik dengan versi mock lama, cek console
   browser untuk warning `[Karyalo] Convex query "..." gagal`. Detail
   lengkap ada di `PROTOTYPE_STOREFRONT_PWA_README.md` bagian "data
   sekarang membaca Convex". **Belum tervalidasi jalan dari sisi saya** —
   kalau ada error setelah restart, salin pesan errornya.

## Setup Web Push (baru, 16 Agustus 2026) — supaya admin Manage dapat notifikasi order baru

Dipicu oleh pertanyaan pemilik proyek: "kalau ada pemesanan di
storefront, apakah sisi Manage akan dapat push notifikasi?" — jawabannya
sekarang **iya**, tapi butuh 3 langkah setup tambahan (di luar
`npx convex dev` + seed di atas) sebelum benar-benar berfungsi:

**1. Generate VAPID keypair** (identitas server pengirim push — WAJIB
unik per deployment, JANGAN pakai punya orang lain/contoh publik):

```
npx web-push generate-vapid-keys
```

(perintah ini otomatis tersedia setelah `npm install` karena `web-push`
sudah ditambahkan ke `package.json`). Keluarannya dua baris `Public Key`
dan `Private Key`.

Kalau mau, contoh keypair yang SUDAH di-generate (algoritma EC P-256
standar, bukan dikarang) untuk langsung dicoba di deployment dev Anda —
**tetap disarankan generate keypair sendiri untuk siapa pun yang lanjut
ke tahap serius**, ini murni supaya Anda bisa langsung tes tanpa install
`web-push` CLI dulu:

```
VAPID_PUBLIC_KEY=BF5WDwgYQcoabL-UJguF1IW7EYkXkf8bxtfkmrJJcUY-8UnrK5KfEwnvMMvRrlWXOwmGapPM2ej7pA-sq6RiW-w
VAPID_PRIVATE_KEY=pVuDVi_eTMiKTGKXHGIbcq2BoVECig6TiQ60iek9snQ
```

**2. Simpan kedua key ke Convex environment variables** (BUKAN ke
`.env.local` — ini dipakai `notificationActions.ts` yang jalan di server
Convex, bukan di browser; `NEXT_PUBLIC_*` khusus untuk yang boleh terlihat
browser, key privat TIDAK BOLEH pakai prefix itu):

```
npx convex env set VAPID_PUBLIC_KEY "BF5WDwgYQcoabL-UJguF1IW7EYkXkf8bxtfkmrJJcUY-8UnrK5KfEwnvMMvRrlWXOwmGapPM2ej7pA-sq6RiW-w"
npx convex env set VAPID_PRIVATE_KEY "pVuDVi_eTMiKTGKXHGIbcq2BoVECig6TiQ60iek9snQ"
```

(ganti dengan hasil generate Anda sendiri kalau pakai langkah 1 versi
"generate sendiri". `npx convex dev` harus sudah pernah jalan sekali
sebelum ini, supaya ada deployment yang dituju.)

**3. Isi `NEXT_PUBLIC_VAPID_PUBLIC_KEY` di `karyalo-manage-pwa`** — buka
`.env.local` di folder `karyalo-manage-pwa` (bukan folder ini), isi
dengan **PUBLIC key yang sama persis** dengan langkah 2 (public key aman
dipakai di browser, cuma private key yang rahasia):

```
NEXT_PUBLIC_CONVEX_URL=<isi sama dengan NEXT_PUBLIC_CONVEX_URL punya storefront ini>
NEXT_PUBLIC_VAPID_PUBLIC_KEY=BF5WDwgYQcoabL-UJguF1IW7EYkXkf8bxtfkmrJJcUY-8UnrK5KfEwnvMMvRrlWXOwmGapPM2ej7pA-sq6RiW-w
```

Lihat `karyalo-manage-pwa/PROTOTYPE_MANAGE_PWA_README.md` bagian Push
Notification untuk cara admin subscribe (tombol di `/settings/notifications`)
dan cara tes (checkout produk apa pun di storefront, atau tombol "Kirim
tes notifikasi").

**Kenapa satu backend Convex dipakai berdua (storefront + manage)?**
Karena trigger push (`orders.create`) hidup di backend yang sama dengan
tabel `orders` — storefront ini. `karyalo-manage-pwa` TIDAK punya backend
Convex sendiri (lihat catatan di README-nya); ia terhubung ke deployment
YANG SAMA lewat `NEXT_PUBLIC_CONVEX_URL` yang sama, tapi tanpa
`convex/_generated` sendiri — pakai `anyApi` (referensi fungsi tanpa
codegen) supaya dua project Next.js terpisah bisa memanggil backend yang
sama tanpa duplikasi source Convex. ***Ini keputusan implementasi untuk
membuat progres cepat, BUKAN keputusan arsitektur backend Manage yang
final*** — begitu arsitektur backend Manage yang sesungguhnya (Admin BFF,
per-domain owning service sesuai PRD §1/§23) didiskusikan dan dibangun,
tabel `orders`/`pushSubscriptions` kemungkinan besar pindah/berubah bentuk.

**Belum tervalidasi jalan dari sisi saya** — sama seperti bagian lain
dokumen ini, saya tidak bisa menjalankan `npx convex dev`/`npx web-push
generate-vapid-keys`/browser Push API dari sandbox saya. VAPID keypair
contoh di atas SUDAH saya generate & cek panjang byte-nya benar (65 byte
public, 32 byte private, format P-256 standar sesuai spesifikasi
[RFC 8292](https://www.rfc-editor.org/rfc/rfc8292)), tapi alur push
end-to-end (subscribe → checkout → notifikasi muncul di device) baru
teori sampai Anda coba sendiri.

## Yang TIDAK ada di backend ini (belum diperlukan prototype)

- Autentikasi user sungguhan (Fase 6+).
- Mutation cart/checkout (cart tetap di localStorage sesuai §53; checkout
  tetap simulasi sampai Fase 5 dikerjakan dengan sengaja, termasuk
  integrasi DOKU/Biteship yang masih ditunda pemilik proyek).
- Reservasi stok/inventory real-time.
- Full-text search (search saat ini substring match sederhana, sama
  seperti versi mock-nya).
