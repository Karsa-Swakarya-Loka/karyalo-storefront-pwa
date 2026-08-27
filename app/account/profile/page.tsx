"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

/**
 * §24 Account — Profil. Form tampilan saja (belum tersambung ke backend/
 * auth apapun) — perubahan hanya tersimpan di state komponen, hilang
 * saat halaman di-refresh. Ini prototype visual, bukan fitur jalan.
 */
export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    phone: "0812-3456-7890",
  });
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Akun", href: "/account" }, { label: "Profil Saya" }]} />
      <h1 className="mb-6 text-2xl font-semibold text-ink">Profil Saya</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="flex max-w-md flex-col gap-4"
      >
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Nama Lengkap</span>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Nomor Telepon</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="tap-target mt-2 inline-flex w-fit items-center rounded-full bg-karyalo-green px-6 py-3 text-sm font-semibold text-warm-white hover:opacity-90"
        >
          {saved ? "Tersimpan ✓" : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
