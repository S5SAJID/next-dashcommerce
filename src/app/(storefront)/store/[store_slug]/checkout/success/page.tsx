import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your order has been placed successfully.",
}

export default async function OrderSuccessPage({ searchParams }: PageProps<'/store/[store_slug]/checkout/success'>) {
  const params = await searchParams;

  const orderId = params.orderId;
  const total = params.total;
  const itemCount = params.itemCount;
  const name = params.name;
  const email = params.email;
  const country = params.country;
  const city = params.city;

  if (!orderId && !total && !itemCount && !name && !email && !country && !city) {
    return (
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find your order. Please check your email for the confirmation or contact support.
        </p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="size-8 text-green-600" aria-hidden="true" />
          <h1 className="text-2xl md:text-3xl font-bold text-balance">Order confirmed</h1>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been placed successfully. We’ve sent a confirmation email with
          your order details.
        </p>

        <section aria-labelledby="order-summary" className="border rounded-lg p-6 mb-8">
          <h2 id="order-summary" className="text-lg font-semibold mb-4">
            Order summary
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Order number</dt>
              <dd className="font-medium">{orderId || "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="font-medium">{itemCount || "0"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Total</dt>
              <dd className="font-medium">{total ? `$${total}` : "—"}</dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="contact-shipping" className="border rounded-lg p-6 mb-8">
          <h2 id="contact-shipping" className="text-lg font-semibold mb-4">
            Contact & shipping
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{name || "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{email || "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">City</dt>
              <dd className="font-medium">{city || "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Country</dt>
              <dd className="font-medium">{country || "—"}</dd>
            </div>
          </dl>
        </section>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Continue shopping</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href="/checkout">Back to checkout</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}