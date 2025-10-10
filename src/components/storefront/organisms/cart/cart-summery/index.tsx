"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoreFrontCartItem from "../cart-item";
import { useCart } from "react-use-cart";
import { CartModelItem } from "../cart-modal";
import { useState } from "react";

export default function StoreFrontCartSummery() {
  const { cartTotal, items } = useCart();
  const [open, setOpen] = useState(true);

  return (
    <div className="self-start w-full border rounded-lg flex flex-col">
      <Collapsible open={open} onOpenChange={setOpen} className="overflow-hidden flex-1">
        <CollapsibleTrigger className="w-full flex justify-between items-center px-6 py-4 border-b text-lg font-semibold">
          <span>Cart Summary</span>
          <Button variant="ghost" size="icon">
            <ChevronDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="h-full">
          <div className="p-6 space-y-6">
            {items.length > 0 ? (
              items.map((item) => (
                <StoreFrontCartItem
                  key={item.id}
                  product={item as CartModelItem}
                />
              ))
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                Your cart is empty.
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className="border-t text-sm md:text-base mt-auto px-6 py-4 flex justify-between">
        <span>Total</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}