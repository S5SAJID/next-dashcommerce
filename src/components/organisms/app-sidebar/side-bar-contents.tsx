"use client";
import {
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { DASHBOARD_APPSIDEBAR_LINKS } from ".";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";

export function DashboardAppSidebarContents() {
	const pathname = usePathname();

	return (
		<SidebarGroupContent>
			<SidebarMenu>
				{DASHBOARD_APPSIDEBAR_LINKS.map((item) => {
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
	);
}
