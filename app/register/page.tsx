import Link from "next/link";

/**
 * §25 Auth — Register. Form tampilan saja, sama seperti /login (belum ada
 * autentikasi sungguhan).
 */
export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-5 px-4 py-16 md:px-6">
      <h1 className="text-2xl font-semibold text-ink">Daftar Akun</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Nama Lengkap</span>
          <input className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Email</span>
          <input
            type="email"
            placeholder="nama@email.com"
            className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-ink">Kata Sandi</span>
          <input
            type="password"
            placeholder="Minimal 8 karakter"
            className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="tap-target mt-2 inline-flex items-center justify-center rounded-full bg-karyalo-green px-6 py-3 text-sm font-semibold text-warm-white hover:opacity-90"
        >
          Daftar
        </button>
      </form>
      <p className="text-center text-sm text-muted">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-deep-pine hover:underline">
          Masuk
        </Link>
      </p>
      <p className="text-center text-xs text-muted">
        Simulasi tampilan — autentikasi sungguhan belum tersambung.
      </p>
    </div>
  );
}
