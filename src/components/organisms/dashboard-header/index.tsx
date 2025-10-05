import { BreadcrumbNavigation } from "@/components/molecules/bread-crumb-navigation";
import { ThemeSwitch } from "@/components/molecules/theme-switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Store } from "lucide-react";
import Link from "next/link";


export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] width-full ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbNavigation />
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Button asChild variant="ghost" size="icon">
                <Link href="http://acme.localhost:3000" target="_blank" prefetch={false}>
                  <Store />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open Store</TooltipContent>
          </Tooltip>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}