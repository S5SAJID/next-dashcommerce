import { listApiKeys } from "@/db/actions/dashboard/settings/api-keys/actions";
import { ApiKeysManager } from "@/components/organisms/dashboard/api-keys/api-keys-manager";
import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export const metadata: Metadata = {
	title: "API Keys",
};

export default async function ApiKeysPage() {
	const listKeysPromise = listApiKeys();

	return (
		<SubSettingsPageLayout
			desc="Manage API keys for external integrations and programmatic access"
			title="API Keys"
		>
			<Suspense fallback={<Spinner />}>
				<ApiKeysManager listKeysPromise={listKeysPromise} />
			</Suspense>
		</SubSettingsPageLayout>
	);
}
