import { SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function DashboardAppSidebarContentsSkeleton() {
	return (
		<SidebarGroupContent>
			<SidebarMenu>
				<SidebarItemSkeleton showIcon width="70%" />
				<SidebarItemSkeleton showIcon width="67%" />
				<SidebarItemSkeleton showIcon width="60%" />
				<SidebarItemSkeleton showIcon width="72%" />
			</SidebarMenu>
		</SidebarGroupContent>
	);
}

export function SidebarItemSkeleton({
	className,
	showIcon = false,
	width = "50%",
	...props
}: React.ComponentProps<"div"> & {
	showIcon?: boolean;
	width?: string;
}) {
	return (
		<div
			className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
			data-sidebar="menu-skeleton"
			data-slot="sidebar-menu-skeleton"
			{...props}
		>
			{showIcon && (
				<Skeleton
					className="size-4 rounded-md"
					data-sidebar="menu-skeleton-icon"
				/>
			)}
			<Skeleton
				className="h-4 max-w-(--skeleton-width) flex-1"
				data-sidebar="menu-skeleton-text"
				style={
					{
						"--skeleton-width": width,
					} as React.CSSProperties
				}
			/>
		</div>
	);
}
