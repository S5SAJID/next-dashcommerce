import { listApiKeys } from "@/db/actions/dashboard/settings/api-keys/actions";
import { ApiKeysManager } from "@/components/organisms/dashboard/api-keys/api-keys-manager";
import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "API Keys",
};

export default async function ApiKeysPage() {
	const result = await listApiKeys();
	const keys = result?.data || [];

	return (
		<SubSettingsPageLayout
			desc="Manage API keys for external integrations and programmatic access"
			title="API Keys"
		>
			<ApiKeysManager initialKeys={keys} />
		</SubSettingsPageLayout>
	);
}
