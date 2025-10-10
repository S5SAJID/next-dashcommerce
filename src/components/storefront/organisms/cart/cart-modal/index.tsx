import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import StoreFrontCartItem from "../cart-item";
import { useCartModel } from "../context/cart-context";
import { useCart } from "react-use-cart";
import React from "react";

export type CartModelItem = {
  id: string;
  price: number;
  name: string;
  image: string;
  quantity?: number;
}

export default function StoreFrontCartModel() {
  const { open, setOpen } = useCartModel();
  const { totalItems, cartTotal, items, emptyCart } = useCart();

  function handleClearCart() {
    if (confirm("Clear the cart?")) {
      emptyCart();
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="font-['PP_Mori']">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <React.Fragment key={item.id}>
                <StoreFrontCartItem product={item as CartModelItem} />
                <Separator />
              </React.Fragment>
            ))
          )}
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
                <TableCell align="right" className="text-lg">
                  ${cartTotal.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="rounded-full" size="lg" asChild disabled={totalItems === 0}>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button
            className="rounded-full"
            variant="ghost"
            size="lg"
            disabled={totalItems === 0}
            onClick={handleClearCart}
          >
            Clear cart
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}