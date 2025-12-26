import {
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuSkeleton,
} from "@/components/ui/sidebar";

export default function DashboardAppSidebarContentsSkeleton() {
	return (
		<SidebarGroupContent>
			<SidebarMenu>
				<SidebarMenuSkeleton showIcon />
				<SidebarMenuSkeleton showIcon />
				<SidebarMenuSkeleton showIcon />
				<SidebarMenuSkeleton showIcon />
			</SidebarMenu>
		</SidebarGroupContent>
	);
}
