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
 */
export function ProductCard({ product }: { product: Product }) {
  const { has, toggle, hydrated } = useWishlist();
  const wished = hydrated && has(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-soft-sand shadow-2xs">
        <Link href={`/product/${product.slug}`} className="block overflow-hidden">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-terracotta px-2.5 py-0.5 text-xs font-semibold text-warm-white shadow-xs">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={wished ? "Hapus dari wishlist" : "Tambah ke wishlist"}
          aria-pressed={wished}
          className={`tap-target absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-warm-white/95 text-ink shadow-xs backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-85 ${
            wished ? "bg-warm-white text-terracotta" : "hover:bg-warm-white"
          }`}
        >
          <Heart
            size={16}
            strokeWidth={1.8}
            fill={wished ? "#A5482D" : "none"}
            color={wished ? "#A5482D" : "currentColor"}
            aria-hidden="true"
          />
        </button>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-2.5 flex flex-col gap-1">
        <span className="line-clamp-2 text-xs font-semibold text-ink transition-colors group-hover:text-deep-pine">
          {product.name}
        </span>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={13} />
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs font-bold text-deep-pine">
            {formatRupiah(product.price)}
          </span>
          {product.compareAtPrice && (
            <>
              <span className="text-xs text-muted line-through">
                {formatRupiah(product.compareAtPrice)}
              </span>
              {discount && (
                <span className="rounded bg-terracotta-soft px-1.5 py-0.2 text-[10px] font-bold text-terracotta">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
