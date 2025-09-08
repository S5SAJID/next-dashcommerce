import { products } from "@/components/organisms/tables/products-table/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import StoreFrontCartItem from "../cart-item";
import { useCartModel } from "../context/cart-context";

const product = products[0]

export default function StoreFrontCartModel() {
  const {open, setOpen} = useCartModel();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="font-['PP_Mori']">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <StoreFrontCartItem product={product} quantity={24} />
          <Separator />
          <StoreFrontCartItem product={products[2]} quantity={2} />
          <Separator />
        </div>
        <SheetFooter>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Taxes</TableCell>
                <TableCell align="right" className="text-lg">$0.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Shipping</TableCell>
                <TableCell align="right" className="text-muted-foreground">Calculated at checkout</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Total</TableCell>
                <TableCell align="right" className="text-lg">$300.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="rounded-full" size="lg" asChild>
            <Link href="/store/checkout">Proceed to Checkout</Link>
          </Button>
          <Button className="rounded-full" variant="ghost" size="lg">Clear cart</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}