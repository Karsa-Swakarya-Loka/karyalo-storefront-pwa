import Link from "next/link";

/**
 * §25 Auth — Login. Form tampilan saja, BELUM ada autentikasi sungguhan
 * (submit tidak diproses ke mana pun). TODO integrasi: Convex Auth atau
 * setara, Fase 6+.
 */
export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-5 px-4 py-16 md:px-6">
      <h1 className="text-2xl font-semibold text-ink">Masuk</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
            placeholder="••••••••"
            className="h-11 rounded-lg border border-border bg-warm-white px-3 text-sm text-ink focus:border-deep-pine focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="tap-target mt-2 inline-flex items-center justify-center rounded-full bg-karyalo-green px-6 py-3 text-sm font-semibold text-warm-white hover:opacity-90"
        >
          Masuk
        </button>
      </form>
      <p className="text-center text-sm text-muted">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-deep-pine hover:underline">
          Daftar
        </Link>
      </p>
      <p className="text-center text-xs text-muted">
        Simulasi tampilan — autentikasi sungguhan belum tersambung.
      </p>
    </div>
  );
}
