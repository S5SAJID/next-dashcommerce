import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

type StoreFrontQuantityInput = {
  className?: string,
  value?: number,
  onChange: (value: number) => void
}

export default function StoreFrontQuantityInput({value=0, className, onChange }: StoreFrontQuantityInput) {
  return (
    <div className={cn("border border-input rounded-full flex h-9 items-center overflow-hidden", className)}>
      <Button 
        onClick={() => onChange(value-1)}
        disabled={value<=0} 
        className="rounded-full size-6 [&>svg]:stroke-primary/80 [&>svg]:hover:stroke-primary/60" 
        variant="ghost" 
        size="icon">
        <Minus />
      </Button>
      <input className="rounded-none p-0 border-none text-center size-6" readOnly value={value} />
      <Button 
        onClick={() => onChange(value+1)}
        className="rounded-full size-8 [&>svg]:stroke-primary/80 [&>svg]:hover:stroke-primary/60" 
        variant="ghost" 
        size="icon">
        <Plus />
      </Button>
    </div>
  )
}