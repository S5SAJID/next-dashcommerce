import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CustomersPrimaryButtons() {
  return (
     <div className='flex gap-2'>
      <Button className='space-x-1'>
        <span>Export</span> <Download size={18} />
      </Button>
    </div>
  )
}