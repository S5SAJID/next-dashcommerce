import { Main } from "@/components/layout/main";
import AppSidebar from "@/components/organisms/app-sidebar";
import { SiteHeader } from "@/components/organisms/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import DashboardProviders from "@/providers/dashboard/providers";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Suspense } from "react";
import DashboardCacheStoreInfoProvider from "@/lib/context/dashboard/store-context-cached";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
	title: {
		template: "%s | S5ARC.", // %s will be replaced by the child page's title
		default: "S5ARC.", // Fallback title for pages without a specific title
	},
	icons: [
		{
			url: "/favico.svg",
		},
	],
};

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${GeistSans.className} w-full h-full`}>
			<DashboardProviders>
				<Suspense
					fallback={
						<div className="min-w-full min-h-full flex gap-1 items-center justify-center">
							<Spinner /> <span>Loading...</span>
						</div>
					}
				>
					<SidebarProvider>
						<AppSidebar />
						<SidebarInset className="@container/content">
							<main className="h-full w-full flex-1">
								<SiteHeader />
								<DashboardCacheStoreInfoProvider>
									<Main>{children}</Main>
								</DashboardCacheStoreInfoProvider>
								<Toaster />
							</main>
						</SidebarInset>
					</SidebarProvider>
				</Suspense>
			</DashboardProviders>
		</div>
	);
}
