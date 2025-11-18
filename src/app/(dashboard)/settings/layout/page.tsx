import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout";
import StoreLayoutSettingsForm from "@/components/organisms/forms/dashboard/settings/layout";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Layout Settings",
};

export default function StoreSettingsPage() {
	return (
		<SubSettingsPageLayout
			desc="Layout & SEO for your store to customise it your way."
			title="Layout & SEO"
		>
			<StoreLayoutSettingsForm />
		</SubSettingsPageLayout>
	);
}
