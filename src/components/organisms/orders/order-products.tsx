type Product = {
  id: number
  name: string
  quantity: number
  price: number
}
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

export default function OrderProductsCard({ products }: { products: Product[] }) {
  return (
    <>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="mn-w-[100px]">Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} >
                <TableCell>
                  <div className="space-x-4 flex items-center">
                    <img width={50} height={50} src={"https://via.placeholder.com/50"} alt={product.name} className="h-8 w-8 bg-muted rounded-md" />
                    <Link href={`products/${product.id}`} className="hover:underline">{product.name}</Link>
                  </div>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell className="text-right">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </>
  )
}