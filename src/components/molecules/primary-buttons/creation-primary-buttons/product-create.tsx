import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function CreateProductPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1'>
        <span>Publish</span> <Plus size={18} />
      </Button>
      <Button
        variant='outline'
        className='space-x-1'
      >
        <span>Save Draft</span> <Download size={18} />
      </Button>
    </div>
  )
}