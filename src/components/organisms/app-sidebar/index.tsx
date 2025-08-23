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

export default function AppSidebar() {
  // Menu items.
  const items = [
    {
      title: "Products",
      url: "#product",
      icon: ShoppingBag,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ];

  const user =  {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/demo.png",
  };


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
              {items.map((item, i) => {
                const isActive = item.url === "#product";
                return <SidebarMenuItem key={i}>
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
          <NavUser user={user} />
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
