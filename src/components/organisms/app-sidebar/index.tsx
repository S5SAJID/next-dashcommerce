"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
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
import Link from "next/link";
import Logo from "../../../../public/favico.svg";
import Image from "next/image";
import { Suspense } from "react";
import { DashboardAppSidebarContents } from "./side-bar-contents";
import DashboardAppSidebarContentsSkeleton from "./sidebar-contents-skeleton";

type SidebarLinkType = {
	title: string;
	url: string;
	icon: LucideIcon;
};

// Menu items.
export const DASHBOARD_APPSIDEBAR_LINKS: SidebarLinkType[] = [
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
								<Image
									alt="S5ARC logo"
									className="size-6 invert dark:invert-0"
									loader={({ src }) => src}
									src={Logo}
								/>
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
					<Suspense fallback={<DashboardAppSidebarContentsSkeleton />}>
						<DashboardAppSidebarContents />
					</Suspense>
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
