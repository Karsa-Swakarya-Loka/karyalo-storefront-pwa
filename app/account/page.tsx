import Link from "next/link";
import { User, MapPin, Package, Heart, ChevronRight } from "lucide-react";

/**
 * §24 Account. BELUM ada autentikasi sungguhan di prototype ini (login/
 * register di app/login, app/register cuma tampilan) — halaman ini
 * menampilkan profil MOCK ("Budi Santoso", sama dengan nama di
 * lib/data/orders.ts) supaya sub-halaman akun (Profil/Alamat/Pesanan)
 * bisa ditinjau isinya, bukan cuma layar kosong "silakan login".
 * TODO integrasi: gerbang auth sungguhan + session Convex, Fase 6+.
 */
const LINKS = [
  { href: "/account/profile", label: "Profil Saya", icon: User },
  { href: "/account/addresses", label: "Alamat Tersimpan", icon: MapPin },
  { href: "/account/orders", label: "Pesanan Saya", icon: Package },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-8 md:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-ink">Akun Saya</h1>

      <div className="mb-6 flex items-center gap-4 rounded-(--radius-card) border border-border p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-soft-sage text-deep-pine">
          <User size={26} aria-hidden="true" />
        </div>
        <div>
          <p className="font-medium text-ink">Budi Santoso</p>
          <p className="text-sm text-muted">budi.santoso@example.com</p>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border rounded-(--radius-card) border border-border">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="tap-target flex items-center justify-between px-5 py-4 text-sm text-ink hover:bg-soft-sand"
          >
            <span className="flex items-center gap-3">
              <Icon size={18} className="text-deep-pine" aria-hidden="true" />
              {label}
            </span>
            <ChevronRight size={16} className="text-muted" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted">
        Data profil di atas contoh statis — belum ada sistem login
        sungguhan pada prototype ini.
      </p>
    </div>
  );
}
