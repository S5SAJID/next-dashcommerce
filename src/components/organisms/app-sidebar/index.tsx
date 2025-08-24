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
import {ShoppingBag, Search, Inbox, Calendar} from "lucide-react"
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";

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
    title: "Calendar",
    url: "#calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#search",
    icon: Search,
  },
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
                    <a href={item.url} className={isActive ? "opacity-100" : "opacity-80"}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
