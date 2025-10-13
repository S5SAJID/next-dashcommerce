import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderCustomerCard({
  customer,
}: {
  customer: { name: string; email: string; phone?: string }
}) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Customer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Name</span>
          <span className="font-medium">{customer.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Email</span>
          <a href={`mailto:${customer.email}`} className="font-medium underline underline-offset-4">
            {customer.email}
          </a>
        </div>
        {customer.phone && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Phone</span>
            <a href={`tel:${customer.phone}`} className="font-medium underline underline-offset-4">
              {customer.phone}
            </a>
          </div>
        )}
      </CardContent>
    </>
  )
}
