import {
	FormPageGridContainer,
	FormPageGridPrimary,
	FormPageGridSecondary,
	FormPageHeader,
	FormPageLayout,
	FormPageTitle,
} from "@/components/layout/form-page-layout/layout";
import type { Metadata } from "next";
import { CheckCircle2, CircleX, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OrderSummaryCard from "@/components/organisms/orders/order-summary";
import OrderProductsCard from "@/components/organisms/orders/order-products";
import { getDashboardOrder } from "@/db/actions/dashboard/orders/actions";
import { notFound } from "next/navigation";
import OrderCustomerCard from "@/components/organisms/orders/order-customer";
import OrderShippingCard from "@/components/organisms/orders/order-shipping";
import OrderActions from "@/components/organisms/orders/order-actions";

export const metadata: Metadata = {
	title: "Order Details",
	description: "Here you can view and manage the details of your order.",
};

export default async function OrderDetailsPage({
	params,
}: PageProps<"/orders/[slug]">) {
	const orderSlug = (await params).slug;
	const { data } = await getDashboardOrder({ orderId: orderSlug });
	if (!data) {
		notFound();
	}
	const { customer, items, order } = data;

	return (
		<FormPageLayout>
			<FormPageHeader>
				<FormPageTitle
					description="Here you can view and manage orders."
					enableBack
					title="Order Details"
				/>
				<OrderActions currentStatus={order.status} orderId={orderSlug} />
			</FormPageHeader>
			<FormPageGridContainer>
				<FormPageGridPrimary>
					<OrderSummaryCard
						discount={0}
						shipping={0}
						subtotal={Number(order.total_amount)}
						tax={0}
						total={Number(order.total_amount)}
					/>
					<Separator />
					<OrderProductsCard
						products={items.map((item, i) => ({
							id: i,
							img: item.product_image as string,
							name: item.product_name,
							quantity: item.quantity,
							price: Number(item.price),
						}))}
					/>
				</FormPageGridPrimary>
				<FormPageGridSecondary>
					{customer && <OrderCustomerCard customer={customer} />}
					<Separator />
					<OrderShippingCard
						shipping={{
							address1:
								order.shipping_address.street_address ||
								customer?.address ||
								"",
							city: order.shipping_address.city || "",
							country: order.shipping_address.country || "",
							name:
								order.shipping_address.full_name || customer?.full_name || "",
							method: "COD",
							state: order.shipping_address.state || "",
							zip: order.shipping_address.postal_code || "",
						}}
					/>
				</FormPageGridSecondary>
			</FormPageGridContainer>
		</FormPageLayout>
	);
}
