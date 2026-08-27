"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data/products";
import { formatRupiah, discountPercent } from "@/lib/utils/currency";
import { useWishlist } from "@/lib/wishlist/wishlist-context";
import { RatingStars } from "./RatingStars";

/**
 * PRD §13 ProductCard — image, nama, harga (+ coret harga lama bila ada
 * diskon), badge (Baru/Sale/Terlaris), rating ringkas, toggle wishlist.
 * Dipakai di Homepage, PLP, Search, dan related products PDP — SATU
 * komponen dipakai ulang di semua tempat itu (bukan ditulis ulang).
 */
export function ProductCard({ product }: { product: Product }) {
  const { has, toggle, hydrated } = useWishlist();
  const wished = hydrated && has(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-(--radius-card) bg-soft-sand">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-terracotta px-2.5 py-1 text-[11px] font-semibold text-warm-white">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={wished ? "Hapus dari wishlist" : "Tambah ke wishlist"}
          aria-pressed={wished}
          className="tap-target absolute right-1 top-1 inline-flex items-center justify-center rounded-full bg-warm-white/90 text-ink backdrop-blur hover:bg-warm-white"
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            fill={wished ? "#A5482D" : "none"}
            color={wished ? "#A5482D" : "currentColor"}
            aria-hidden="true"
          />
        </button>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-2.5 flex flex-col gap-1">
        <span className="line-clamp-2 text-sm text-ink">{product.name}</span>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-deep-pine">
            {formatRupiah(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="text-xs text-muted line-through">
                {formatRupiah(product.compareAtPrice)}
              </span>
              {discount && (
                <span className="text-xs font-medium text-terracotta">-{discount}%</span>
              )}
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
