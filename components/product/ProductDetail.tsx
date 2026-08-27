"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/data/products";
import { formatRupiah, discountPercent } from "@/lib/utils/currency";
import { useCart } from "@/lib/cart/cart-context";
import { useWishlist } from "@/lib/wishlist/wishlist-context";
import { RatingStars } from "./RatingStars";

/**
 * PDP-01..18 — bagian interaktif Product Detail Page: galeri, pemilihan
 * varian, kuantitas, add-to-cart, wishlist toggle. Sengaja dipisah dari
 * `app/product/[slug]/page.tsx` (server component) supaya deskripsi/
 * related products tetap server-rendered — hanya bagian yang butuh state
 * client yang jadi client component (best practice App Router).
 *
 * Harga & stok yang ditampilkan TIDAK otoritatif (§40 API Design
 * Expectations) — validasi ulang wajib terjadi di backend saat checkout
 * sungguhan (Fase 5+, belum ada di prototype ini).
 */
export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle, hydrated } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.variants.map((v) => [v.name, v.options[0]]))
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const discount = discountPercent(product.price, product.compareAtPrice);
  const wished = hydrated && has(product.id);

  const variantId = useMemo(() => {
    if (product.variants.length === 0) return "default";
    return product.variants.map((v) => selected[v.name]).join("|");
  }, [product.variants, selected]);

  const variantLabel = useMemo(() => {
    if (product.variants.length === 0) return "";
    return product.variants.map((v) => selected[v.name]).join(" / ");
  }, [product.variants, selected]);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantId,
      name: product.name,
      variantLabel,
      unitPrice: product.price,
      quantity,
      imageUrl: product.images[0] ?? null,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      {/* Galeri */}
      <div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-(--radius-card) bg-soft-sand">
          <Image
            src={product.images[activeImage] ?? product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-warm-white">
              {product.badge}
            </span>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Lihat foto ${i + 1}`}
                className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                  activeImage === i ? "border-deep-pine" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info & aksi */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink md:text-2xl">{product.name}</h1>
          <div className="mt-2">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={16} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-deep-pine">
            {formatRupiah(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-muted line-through">
                {formatRupiah(product.compareAtPrice)}
              </span>
              {discount && (
                <span className="rounded bg-terracotta-soft px-2 py-0.5 text-xs font-semibold text-terracotta">
                  Hemat {discount}%
                </span>
              )}
            </>
          )}
        </div>

        <p className="text-sm text-muted">{product.shortDescription}</p>

        {/* Varian */}
        {product.variants.map((group) => (
          <div key={group.name}>
            <p className="mb-2 text-sm font-medium text-ink">{group.name}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((opt) => {
                const isSelected = selected[group.name] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelected((s) => ({ ...s, [group.name]: opt }))}
                    aria-pressed={isSelected}
                    className={`tap-target rounded-full border px-4 text-sm ${
                      isSelected
                        ? "border-deep-pine bg-deep-pine text-warm-white"
                        : "border-border text-ink hover:border-deep-pine"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Kuantitas */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Jumlah</p>
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Kurangi jumlah"
              className="tap-target inline-flex items-center justify-center text-ink"
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-ink">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              aria-label="Tambah jumlah"
              className="tap-target inline-flex items-center justify-center text-ink"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
          <span className="ml-3 text-xs text-muted">Stok {product.stock}</span>
        </div>

        {/* Aksi */}
        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="tap-target flex flex-1 items-center justify-center gap-2 rounded-full bg-karyalo-green px-6 py-3 text-sm font-semibold text-warm-white hover:opacity-90"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {justAdded ? "Ditambahkan ✓" : "Tambah ke Keranjang"}
          </button>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-label={wished ? "Hapus dari wishlist" : "Tambah ke wishlist"}
            aria-pressed={wished}
            className="tap-target inline-flex items-center justify-center rounded-full border border-border px-4 text-ink hover:border-deep-pine"
          >
            <Heart
              size={20}
              strokeWidth={1.8}
              fill={wished ? "#A5482D" : "none"}
              color={wished ? "#A5482D" : "currentColor"}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 text-sm font-medium text-ink">Deskripsi Produk</p>
          <p className="text-sm leading-relaxed text-muted">{product.description}</p>
          <p className="mt-3 text-xs text-muted">SKU: {product.sku}</p>
        </div>
      </div>
    </div>
  );
}
