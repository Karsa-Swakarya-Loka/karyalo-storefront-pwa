import { Plus, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const MOCK_ADDRESSES = [
  {
    label: "Rumah",
    isDefault: true,
    recipient: "Budi Santoso",
    phone: "0812-3456-7890",
    address: "Jl. Merdeka No. 12, Kelurahan Sukamaju, Jakarta Selatan, DKI Jakarta, 12345",
  },
  {
    label: "Kantor",
    isDefault: false,
    recipient: "Budi Santoso",
    phone: "0812-3456-7890",
    address: "Menara Karyalo Lt. 8, Jl. Sudirman No. 45, Jakarta Pusat, DKI Jakarta, 10220",
  },
];

/**
 * §24 Account — Alamat Tersimpan. Data mock, tombol "Tambah Alamat"
 * dekoratif (belum ada form tambah alamat sungguhan di prototype ini).
 */
export default function AddressesPage() {
  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Akun", href: "/account" }, { label: "Alamat Tersimpan" }]} />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Alamat Tersimpan</h1>
        <button
          type="button"
          className="tap-target inline-flex items-center gap-1.5 rounded-full border border-border px-4 text-sm font-medium text-ink hover:border-deep-pine"
        >
          <Plus size={16} aria-hidden="true" />
          Tambah Alamat
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_ADDRESSES.map((addr) => (
          <div key={addr.label} className="rounded-(--radius-card) border border-border p-5">
            <div className="mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-deep-pine" aria-hidden="true" />
              <span className="text-sm font-semibold text-ink">{addr.label}</span>
              {addr.isDefault && (
                <span className="rounded-full bg-soft-sage px-2 py-0.5 text-[11px] font-medium text-deep-pine">
                  Utama
                </span>
              )}
            </div>
            <p className="text-sm text-ink">{addr.recipient} — {addr.phone}</p>
            <p className="text-sm text-muted">{addr.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
