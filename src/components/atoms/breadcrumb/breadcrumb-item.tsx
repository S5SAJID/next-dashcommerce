import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItemProps {
  children: React.ReactNode
  isLast?: boolean
  className?: string
}

export function BreadcrumbItem({ children, isLast = false, className }: BreadcrumbItemProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
      {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </div>
  )
}
