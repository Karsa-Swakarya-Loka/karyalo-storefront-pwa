import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Query produk — pengganti fungsi mock di lib/data/products.ts begitu
 * frontend disambungkan (lihat TODO integrasi di file itu). Nama fungsi
 * sengaja dibuat semirip mungkin dengan fungsi mock aslinya supaya jelas
 * pemetaannya:
 *   getAllProducts()        -> products.list
 *   getProductBySlug(slug)  -> products.getBySlug
 *   getProductsByCategory() -> products.byCategory
 *   getFeaturedProducts()   -> products.featured
 *   getNewProducts()        -> products.newArrivals
 *   getSaleProducts()       -> products.onSale
 *   getBestSellerProducts() -> products.bestSellers
 *   searchProducts(q)       -> products.search
 *   getRelatedProducts()    -> products.related
 *
 * Dataset masih kecil (~18 produk) — filter badge/harga dilakukan di JS
 * setelah `.collect()`, bukan index terpisah. Cukup untuk prototype;
 * kalau katalog nanti jadi ribuan produk, ini perlu index tambahan
 * (mis. by_badge) supaya tidak full-scan tabel tiap query.
 */

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const byCategory = query({
  args: { categorySlug: v.string() },
  handler: async (ctx, { categorySlug }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categorySlug", categorySlug))
      .collect();
  },
});

export const featured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 8 }) => {
    const all = await ctx.db.query("products").collect();
    return all.slice(0, limit);
  },
});

export const newArrivals = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 8 }) => {
    const all = await ctx.db.query("products").collect();
    return all.filter((p) => p.badge === "Baru").slice(0, limit);
  },
});

export const bestSellers = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 8 }) => {
    const all = await ctx.db.query("products").collect();
    return all.filter((p) => p.badge === "Terlaris").slice(0, limit);
  },
});

export const onSale = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 8 }) => {
    const all = await ctx.db.query("products").collect();
    return all.filter((p) => p.compareAtPrice !== undefined).slice(0, limit);
  },
});

export const search = query({
  args: { q: v.string() },
  handler: async (ctx, { q }) => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const all = await ctx.db.query("products").collect();
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.categorySlug.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
    );
  },
});

export const related = query({
  args: { categorySlug: v.string(), excludeSlug: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { categorySlug, excludeSlug, limit = 4 }) => {
    const inCategory = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categorySlug", categorySlug))
      .collect();
    return inCategory.filter((p) => p.slug !== excludeSlug).slice(0, limit);
  },
});
