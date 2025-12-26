import { BreadcrumbNavigation } from "@/components/molecules/bread-crumb-navigation";
import { ThemeSwitch } from "@/components/molecules/theme-switch";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import DashboardStoreOpenButton from "./store-open-button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function SiteHeader() {
	return (
		<header className="width-full flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					className="mx-2 data-[orientation=vertical]:h-4"
					orientation="vertical"
				/>
				<Suspense fallback={<Skeleton className="h-4 w-28" />}>
					<BreadcrumbNavigation />
				</Suspense>
				<div className="ml-auto flex items-center gap-2">
					<Suspense fallback={<Skeleton className="size-8" />}>
						<DashboardStoreOpenButton />
					</Suspense>
					<ThemeSwitch />
				</div>
			</div>
		</header>
	);
}
