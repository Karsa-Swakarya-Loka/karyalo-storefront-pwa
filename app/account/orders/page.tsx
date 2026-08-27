import Link from "next/link";
import Image from "next/image";
import { getAllOrders } from "@/lib/data/orders";
import { formatRupiah } from "@/lib/utils/currency";
import { OrderStatusBadge } from "@/components/order/OrderStatusBadge";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default async function AccountOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-8 md:px-6">
      <Breadcrumb items={[{ label: "Akun", href: "/account" }, { label: "Pesanan Saya" }]} />
      <h1 className="mb-6 text-2xl font-semibold text-ink">Pesanan Saya</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="flex flex-col gap-3 rounded-(--radius-card) border border-border p-4 hover:border-deep-pine"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-ink">{order.orderNumber}</p>
                <p className="text-xs text-muted">{order.createdAt}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex gap-2">
              {order.items.slice(0, 4).map((item, i) => (
                <div key={i} className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-soft-sand">
                  {item.imageUrl && (
                    <Image src={item.imageUrl} alt={item.name} fill sizes="48px" className="object-cover" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-deep-pine">{formatRupiah(order.total)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
