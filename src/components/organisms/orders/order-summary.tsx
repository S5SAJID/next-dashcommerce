import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"

export default function OrderSummaryCard({
  subtotal,
  shipping,
  tax,
  discount,
  total,
}: {
  subtotal: number
  shipping: number
  tax: number
  discount?: number
  total: number
  paymentMethod: string
}) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice({ price: subtotal })}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{formatPrice({ price: shipping })}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatPrice({ price: tax })}</span>
        </div>
        {typeof discount === "number" && discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-destructive">-{formatPrice({ price: discount })}</span>
          </div>
        )}
        <Separator />
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="font-semibold">{formatPrice({ price: total })}</span>
        </div>
      </CardContent>
    </>
  )
}
