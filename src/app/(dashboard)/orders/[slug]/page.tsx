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

export const metadata: Metadata = {
  title: 'Order Details',
  description: 'Here you can view and manage the details of your order.',
}

export default async function OrderDetailsPage({ }: PageProps<"/orders/[slug]">) {
  const order = {
    id: 'order_123456',
    number: `#${'order_123456'.toUpperCase()}`,
    date: "2025-10-09",
    status: "paid" as "paid" | "processing" | "fulfilled" | "refunded" | "cancelled",
    customer: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
    },
    shipping: {
      name: "Alex Johnson",
      address1: "123 Market Street",
      address2: "Suite 400",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "United States",
      method: "UPS Ground",
      tracking: "1Z9999W99999999999",
    },
    payment: {
      method: "Visa •••• 4242",
      subtotal: 188.0,
      shipping: 8.0,
      tax: 15.04,
      discount: 10.0,
      total: 201.04,
      currency: "USD",
    },
    items: [
      {
        id: "sku-1",
        name: "Premium Cotton T-Shirt",
        sku: "TSHIRT-COTTON-WHITE-M",
        image: "/t-shirt-white.jpg",
        options: [
          { name: "Color", value: "White" },
          { name: "Size", value: "M" },
        ],
        quantity: 2,
        price: 29.0,
      },
      {
        id: "sku-2",
        name: "Athletic Joggers",
        sku: "JOGGERS-BLACK-L",
        image: "/black-joggers.png",
        options: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "L" },
        ],
        quantity: 1,
        price: 59.0,
      },
      {
        id: "sku-3",
        name: "Everyday Hoodie",
        sku: "HOODIE-NAVY-XL",
        image: "/navy-hoodie.jpg",
        options: [
          { name: "Color", value: "Navy" },
          { name: "Size", value: "XL" },
        ],
        quantity: 1,
        price: 71.0,
      },
    ],
    timeline: [
      { id: "t1", title: "Order placed", description: "Payment captured via card", at: "2025-10-09 10:12 AM" },
      { id: "t2", title: "Payment confirmed", description: "Funds settled", at: "2025-10-09 10:13 AM" },
      { id: "t3", title: "Preparing order", description: "Items picking/packing started", at: "2025-10-09 12:02 PM" },
    ],
  }
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
            subtotal={order.payment.subtotal}
            shipping={order.payment.shipping}
            tax={order.payment.tax}
            discount={order.payment.discount}
            total={order.payment.total}
            paymentMethod={order.payment.method}
          />
          <Separator />
          <OrderProductsCard products={order.items.map((item, i) => ({
            id: i,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))} />
        </FormPageGridPrimary>
        <FormPageGridSecondary>
          <OrderCustomerCard customer={order.customer} />
          <Separator />
          <OrderShippingCard shipping={order.shipping}/>
        </FormPageGridSecondary>
      </FormPageGridContainer>
    </FormPageLayout >
  )
}