"use client"

import { usePathname } from "next/navigation"
import { BreadcrumbItem } from "../atoms/breadcrumb/breadcrumb-item"
import { BreadcrumbLink } from "../atoms/breadcrumb/breadcrumb-link"

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function BreadcrumbNavigation() {
  const pathname = usePathname()

  // Split pathname into segments and filter out empty strings
  const segments = pathname.split("/").filter(Boolean)

  // If we're on the home page, show "Home"
  if (segments.length === 0) {
    // return (
    //   <BreadcrumbItem isLast>
    //     <BreadcrumbLink href="/" isActive>
    //       Home
    //     </BreadcrumbLink>
    //   </BreadcrumbItem>
    // )
    return null;
  }

  return (
    <nav className="flex items-center space-x-1" aria-label="Breadcrumb">
      {/* Home link */}
      {/* <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem> */}

      {/* Dynamic segments */}
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1
        const formattedSegment = formatSegment(segment)

        return (
          <BreadcrumbItem key={href} isLast={isLast}>
            <BreadcrumbLink href={href} isActive={isLast}>
              {formattedSegment}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </nav>
  )
}
