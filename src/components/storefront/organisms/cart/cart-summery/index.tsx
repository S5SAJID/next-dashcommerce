import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/components/organisms/tables/products-table/data";
import StoreFrontCartItem from "../cart-item";

export default function StoreFrontCartSummery() {
  return (
    <div className="self-start w-full border rounded-lg flex flex-col">
      <Collapsible className="overflow-hidden flex-1">
        <CollapsibleTrigger className="w-full flex justify-between items-center px-6 py-4 border-b text-lg font-semibold">
          <span>Cart Summary</span>
          <Button variant="ghost" size="icon">
            <ChevronDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="h-full">
          <div className="p-6 space-y-6">
            <StoreFrontCartItem product={products[2]} quantity={23} />
            <StoreFrontCartItem product={products[3]} quantity={12} />
            <StoreFrontCartItem product={products[4]} quantity={123} />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className="border-t text-sm md:text-base mt-auto px-6 py-4 flex justify-between">
        <span>Total</span>
        <span>$46,422.00</span>
      </div>
    </div>
  );
}