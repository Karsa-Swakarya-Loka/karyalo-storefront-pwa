import { notFound } from "next/navigation";
import { getOrderById, getAllOrders } from "@/lib/data/orders";
import { OrderDetail } from "@/components/order/OrderDetail";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

// dynamicParams default true — order id Convex sungguhan yang tidak masuk
// daftar build-time ini tetap bisa diakses on-demand.
export async function generateStaticParams() {
  const orders = await getAllOrders();
  return orders.map((o) => ({ id: o.id }));
}

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-(--container-content) px-4 py-8 md:px-6">
      <Breadcrumb
        items={[
          { label: "Akun", href: "/account" },
          { label: "Pesanan Saya", href: "/account/orders" },
          { label: order.orderNumber },
        ]}
      />
      <OrderDetail order={order} />
    </div>
  );
}
