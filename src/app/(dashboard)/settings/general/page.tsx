import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout";
import StoreSettingsForm from "@/components/organisms/forms/dashboard/settings/store";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "General Store Settings",
};

export default function StoreSettingsPage() {
	return (
		<SubSettingsPageLayout desc="General settings about store." title="General">
			<StoreSettingsForm />
		</SubSettingsPageLayout>
	);
}
