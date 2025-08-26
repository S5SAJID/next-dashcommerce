import { Download, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ProductsPrimaryButtons() {
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
      >
        <span>Import</span> <Download size={18} />
      </Button>
      <Link href='/products/create'>
        <Button className='space-x-1'>
          <span>Create</span> <Plus size={18} />
        </Button>
      </Link>
    </div>
  )
}