import { Button } from "@/components/ui/button";

export default function CreateProductPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' type="submit">
        <span>Create</span>
      </Button>
    </div>
  )
}