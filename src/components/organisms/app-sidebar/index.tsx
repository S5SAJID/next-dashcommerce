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
import {ShoppingBag, Inbox, Users, Settings} from "lucide-react"
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import Link from "next/link";

// Menu items.
const SIDEBAR_LINKS = [
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
    url: "/settings/store",
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
              <a href="#">
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
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
