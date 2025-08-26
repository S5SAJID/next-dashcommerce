import Link from "next/link"
import { cn } from "@/lib/utils"

interface BreadcrumbLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
  className?: string
}

export function BreadcrumbLink({ href, children, isActive = false, className }: BreadcrumbLinkProps) {
  if (isActive) {
    return <span className={cn("text-sm font-medium text-foreground", className)}>{children}</span>
  }

  return (
    <Link
      href={href}
      className={cn("text-sm text-muted-foreground hover:text-foreground transition-colors", className)}
    >
      {children}
    </Link>
  )
}
