import { getDashboardIntegrations } from "@/db/actions/dashboard/integrations/actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateCustomIntegrationDialog } from "@/components/organisms/dashboard/integrations/create-custom-integration-dialog";
import { SubSettingsPageLayout } from "@/components/layout/dashboard/settings/layout";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { IntegrationListItem } from "@/components/organisms/dashboard/integrations/integration-list-item";

export const metadata: Metadata = {
	title: "Integrations",
};

export default async function IntegrationsPage() {
	const result = await getDashboardIntegrations();

	if (!result.data) {
		return (
			<SubSettingsPageLayout
				desc="Connect your store to external services and automate workflows"
				title="Integrations"
			>
				<div className="text-center py-12">
					<p className="text-destructive">Failed to load integrations</p>
				</div>
			</SubSettingsPageLayout>
		);
	}

	const integrations = result.data;
	const globalIntegrations = integrations.filter((i) => i.is_global);
	const customIntegrations = integrations.filter((i) => !i.is_global);

	return (
		<SubSettingsPageLayout
			desc="Connect your store to external services and automate workflows"
			title="Integrations"
		>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h4 className="font-medium">Available Integrations</h4>
						<p className="text-sm text-muted-foreground">
							Connect to pre-built integrations or create your own
						</p>
					</div>
					<CreateCustomIntegrationDialog>
						<Button size="sm">
							<Plus className="mr-2 h-4 w-4" />
							Create Custom
						</Button>
					</CreateCustomIntegrationDialog>
				</div>

				{globalIntegrations.length > 0 && (
					<div className="space-y-3">
						{globalIntegrations.map((integration, index) => (
							<div key={integration.id}>
								<IntegrationListItem integration={integration} />
								{index < globalIntegrations.length - 1 && (
									<Separator className="mt-3" />
								)}
							</div>
						))}
					</div>
				)}

				{customIntegrations.length > 0 && (
					<div className="space-y-4">
						<Separator />
						<div>
							<h4 className="font-medium">Custom Integrations</h4>
							<p className="text-sm text-muted-foreground">
								Integrations created by you for this store
							</p>
						</div>
						<div className="space-y-3">
							{customIntegrations.map((integration, index) => (
								<div key={integration.id}>
									<IntegrationListItem integration={integration} isCustom />
									{index < customIntegrations.length - 1 && (
										<Separator className="mt-3" />
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{integrations.length === 0 && (
					<div className="text-center py-12 border rounded-lg border-dashed">
						<p className="text-muted-foreground">No integrations available</p>
						<p className="text-sm text-muted-foreground mt-2">
							Create a custom integration to get started
						</p>
					</div>
				)}
			</div>
		</SubSettingsPageLayout>
	);
}
