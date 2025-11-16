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
import {
	ShoppingBag,
	Inbox,
	Users,
	Settings,
	type LucideIcon,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import Link from "next/link";
import Logo from "../../../../public/favico.svg";
import Image from "next/image";

type SidebarLinkType = {
	title: string;
	url: string;
	icon: LucideIcon;
};

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
		icon: Settings,
	},
];

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
								<Image alt="S5ARC logo" className="size-6" src={Logo} />
								<span className="font-semibold text-base">S5ARC.</span>
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

								return (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton asChild isActive={isActive}>
											<Link
												className={isActive ? "opacity-100" : "opacity-80"}
												href={item.url}
											>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenuItem>
					<NavUser />
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	);
}
