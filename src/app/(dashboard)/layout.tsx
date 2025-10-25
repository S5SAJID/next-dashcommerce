import { Main } from "@/components/layout/main";
import AppSidebar from "@/components/organisms/app-sidebar";
import { SiteHeader } from "@/components/organisms/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getDashboadStore } from "@/db/actions/dashboard/settings/layout/actions";
import { auth } from "@/lib/auth/auth";
import { DashboardStoreInfoProvider } from "@/lib/context/dashboard/store-context-provider";
import DashboardProviders from "@/providers/dashboard/providers";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
	title: {
		template: "%s | Custom Eco", // %s will be replaced by the child page's title
		default: "Custom Eco", // Fallback title for pages without a specific title
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
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/signin");
	}

	const { data } = await getDashboadStore();
	if (!data) {
		notFound();
	}

	return (
		<DashboardProviders>
			<DashboardStoreInfoProvider initialStore={data}>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset className="@container/content">
						<main className="h-full w-full flex-1">
							<SiteHeader />
							<Main>{children}</Main>
							<Toaster />
						</main>
					</SidebarInset>
				</SidebarProvider>
			</DashboardStoreInfoProvider>
		</DashboardProviders>
	);
}
