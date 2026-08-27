import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { MOCK_PRODUCTS } from "./products";

/**
 * Data pesanan — untuk mengisi tampilan §22-24 (Order Success, Order
 * Tracking, Account/Orders). TIDAK ada sistem order sungguhan di prototype
 * ini — checkout (app/checkout) tidak menulis ke sini (masih simulasi via
 * sessionStorage, lihat app/checkout/page.tsx), data di bawah untuk
 * keperluan review tampilan saja.
 *
 * **Diperbarui 16 Agustus 2026 (wiring Convex):** sama seperti
 * lib/data/products.ts — fungsi di bawah mencoba baca dari Convex
 * (`convex/orders.ts`) dulu, fallback ke `MOCK_ORDERS` kalau
 * `NEXT_PUBLIC_CONVEX_URL` kosong atau query gagal. `getOrderById`
 * menerima ID Convex sungguhan (dari data yang sudah datang dari Convex,
 * mis. link di /account/orders) MAUPUN id mock lama seperti "ord-1001"
 * (fallback otomatis kalau id tidak valid sebagai Convex ID). Lihat
 * catatan "belum divalidasi" di lib/data/products.ts — berlaku sama di
 * sini.
 */

export type OrderStatus = "diproses" | "dikirim" | "selesai" | "dibatalkan";

export interface OrderItem {
  productId: string;
  name: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // format tampilan siap pakai, mock
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingLabel: string;
  paymentLabel: string;
  recipientName: string;
  address: string;
}

function itemFromProduct(slug: string, quantity: number, variantLabel?: string): OrderItem {
  const p = MOCK_PRODUCTS.find((p) => p.slug === slug)!;
  return {
    productId: p.id,
    name: p.name,
    variantLabel,
    unitPrice: p.price,
    quantity,
    imageUrl: p.images[0] ?? null,
  };
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "KRY-10041001",
    status: "selesai",
    createdAt: "2 Agustus 2026",
    items: [
      itemFromProduct("kemeja-katun-pria-putih", 1, "L"),
      itemFromProduct("celana-chino-pria-khaki", 1, "31"),
    ],
    subtotal: 428000,
    shippingCost: 15000,
    total: 443000,
    shippingLabel: "Reguler (3-5 hari)",
    paymentLabel: "Transfer Bank",
    recipientName: "Budi Santoso",
    address: "Jl. Merdeka No. 12, Jakarta Selatan, 12345",
  },
  {
    id: "ord-1002",
    orderNumber: "KRY-10101002",
    status: "dikirim",
    createdAt: "10 Agustus 2026",
    items: [itemFromProduct("sneakers-canvas-putih", 1, "40")],
    subtotal: 249000,
    shippingCost: 35000,
    total: 284000,
    shippingLabel: "Express (1-2 hari)",
    paymentLabel: "E-Wallet",
    recipientName: "Budi Santoso",
    address: "Jl. Merdeka No. 12, Jakarta Selatan, 12345",
  },
  {
    id: "ord-1003",
    orderNumber: "KRY-10151003",
    status: "diproses",
    createdAt: "15 Agustus 2026",
    items: [
      itemFromProduct("dress-midi-rayon-navy", 1, "M"),
      itemFromProduct("sling-bag-mini-terracotta", 1),
    ],
    subtotal: 424000,
    shippingCost: 15000,
    total: 439000,
    shippingLabel: "Reguler (3-5 hari)",
    paymentLabel: "Transfer Bank",
    recipientName: "Budi Santoso",
    address: "Jl. Merdeka No. 12, Jakarta Selatan, 12345",
  },
];

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

/** Convex doc (_id, _creationTime, ..., createdAtLabel) -> tipe Order UI. */
function mapOrder(doc: Doc<"orders">): Order {
  const { _id, _creationTime, createdAtLabel, ...rest } = doc;
  void _creationTime;
  return { id: _id, createdAt: createdAtLabel, ...rest };
}

async function safeConvex<T>(run: () => Promise<T>, fallback: T, label: string): Promise<T> {
  if (!CONVEX_URL) return fallback;
  try {
    return await run();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[Karyalo] Convex query "${label}" gagal, fallback ke mock data:`, err);
    }
    return fallback;
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  return safeConvex(
    async () => {
      const doc = await fetchQuery(api.orders.getById, { id: id as Id<"orders"> });
      return doc ? mapOrder(doc) : null;
    },
    MOCK_ORDERS.find((o) => o.id === id) ?? null,
    "orders.getById"
  );
}

export async function getAllOrders(): Promise<Order[]> {
  return safeConvex(
    async () => (await fetchQuery(api.orders.list, {})).map(mapOrder),
    MOCK_ORDERS,
    "orders.list"
  );
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  diproses: "Diproses",
  dikirim: "Dikirim",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
};
