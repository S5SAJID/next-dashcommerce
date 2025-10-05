"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {ShoppingBag, Inbox, Users, Settings, LucideIcon} from "lucide-react"
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import Link from "next/link";
import Logo from "../../../../public/favico.svg"
import Image from "next/image";

type SidebarLinkType = {
  title: string,
  url: string,
  icon: LucideIcon,
}

// Menu items.
const SIDEBAR_LINKS: SidebarLinkType[] = [
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: Inbox,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings/general",
    icon: Settings
  }
];

const USER =  {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/demo.png",
};

export default function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/products">
                <Image src={Logo} className="size-6" alt="Acme inc logo" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Main sidebar content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_LINKS.map((item) => {
                const isActive = isActivePath(item.url, pathname);
                
                return <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url} className={isActive ? "opacity-100" : "opacity-80"}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <NavUser user={USER} />
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
