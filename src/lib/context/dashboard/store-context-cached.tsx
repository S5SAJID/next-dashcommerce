import { getDashboadStore } from "@/db/actions/dashboard/settings/layout/actions";
import { DashboardStoreInfoProvider } from "./store-context-provider";
import { notFound } from "next/navigation";

export default async function DashboardCacheStoreInfoProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	"use cache: private";

	const { data } = await getDashboadStore();

	if (!data) {
		notFound();
	}
	return (
		<DashboardStoreInfoProvider initialStore={data}>
			{children}
		</DashboardStoreInfoProvider>
	);
}
