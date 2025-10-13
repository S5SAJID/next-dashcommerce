import { FormPageGridContainer, FormPageGridPrimary, FormPageGridSecondary, FormPageHeader, FormPageLayout, FormPageTitle } from "@/components/layout/form-page-layout/layout";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle2, CircleX, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import OrderSummaryCard from "@/components/organisms/orders/order-summary";
import OrderProductsCard from "@/components/organisms/orders/order-products";
import OrderCustomerCard from "@/components/organisms/orders/order-customer";
import OrderShippingCard from "@/components/organisms/orders/order-shipping";
import { getDashboardOrder } from "@/db/actions/dashboard/orders/actions";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: 'Order Details',
  description: 'Here you can view and manage the details of your order.',
}

export default async function OrderDetailsPage({ params }: PageProps<"/orders/[slug]">) {
  const orderSlug = (await params).slug
  const {order, items, customer} = await getDashboardOrder(orderSlug)

  return (
    <FormPageLayout>
      <FormPageHeader>
        <FormPageTitle enableBack title="Order Details" description="Here you can view and manage orders." />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Update status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Set status</DropdownMenuLabel>
              <DropdownMenuItem>
                <Loader className="text-muted-foreground" /> Processing
              </DropdownMenuItem>
              {/* now corresponding icons for the rest */}
              <DropdownMenuItem>
                <CheckCircle2 className="text-muted-green-400" /> Fulfilled
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CircleX className="text-muted-red-400" /> Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <span>Mark Delivered</span>
          </Button>
        </div>
      </FormPageHeader>
      <FormPageGridContainer>
        <FormPageGridPrimary>
          <OrderSummaryCard
            subtotal={Number(order.total_amount)}
            shipping={0}
            tax={0}
            discount={0}
            total={Number(order.total_amount)}
          />
          <Separator />
          <OrderProductsCard products={items.map((item, i) => ({
            id: i,
            name: item.product_name,
            quantity: item.quantity,
            price: Number(item.price),
          }))} />
        </FormPageGridPrimary>
        <FormPageGridSecondary>
          <OrderCustomerCard customer={customer} />
          <Separator />
          <OrderShippingCard shipping={{
            address1: customer?.address,
          }}/>
        </FormPageGridSecondary>
      </FormPageGridContainer>
    </FormPageLayout >
  )
}