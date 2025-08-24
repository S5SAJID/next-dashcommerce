import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function OrdersPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1'>
        <span>Create</span> <Plus size={18} />
      </Button>
    </div>
  )
}