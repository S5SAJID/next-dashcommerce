import StoreFrontCheckoutForm from "@/components/storefront/organisms/forms/checkout";
import { Metadata } from "next";
import StoreFrontCartSummery from "@/components/storefront/organisms/cart/cart-summery";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase at Acme Store.",
}

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div className="py-6 w-full order-last md:order-none">
        <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">Please fill in your details to complete the purchase.</p>
        <StoreFrontCheckoutForm />
      </div>
      {/* Cart Preview */}
      <StoreFrontCartSummery/>
    </div>
  )
}