"use client";

import { type IntegrationDefinition } from "@/db/schema/tables/integrations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getIntegrationInstallation } from "@/db/actions/dashboard/integrations/actions";
import { Trash2 } from "lucide-react";
import { DeleteIntegrationButton } from "./delete-integration-button";
import { IntegrationDialog } from "./integration-dialog";

type Props = {
	integration: IntegrationDefinition;
	isCustom?: boolean;
};

export function IntegrationListItem({ integration, isCustom = false }: Props) {
	const [installation, setInstallation] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadInstallation() {
			const result = await getIntegrationInstallation({
				integrationId: integration.id,
			});
			if (result.data) {
				setInstallation(result.data);
			}
			setLoading(false);
		}
		loadInstallation();
	}, [integration.id]);

	const isConnected = !!installation;
	const isEnabled = installation?.is_enabled;

	return (
		<div className="flex items-start gap-4 py-3 border px-3 rounded">
			{/* Logo */}
			<div className="flex-shrink-0">
				{integration.logo_url ? (
					<img
						alt={integration.name}
						className="w-12 h-12 rounded-md object-cover"
						src={integration.logo_url}
					/>
				) : (
					<div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
						<span className="text-lg font-semibold text-muted-foreground">
							{integration.name.charAt(0)}
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-4">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<h4 className="font-medium text-sm">{integration.name}</h4>
							{isCustom && (
								<Badge className="text-xs" variant="secondary">
									Custom
								</Badge>
							)}
							{isConnected && (
								<Badge
									className="text-xs"
									variant={isEnabled ? "default" : "outline"}
								>
									{isEnabled ? "Connected" : "Disabled"}
								</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{integration.description || "No description available"}
						</p>
						<div className="flex flex-wrap gap-1 mt-2">
							{integration.subscribed_events.slice(0, 3).map((event) => (
								<Badge className="text-xs" key={event} variant="outline">
									{event}
								</Badge>
							))}
							{integration.subscribed_events.length > 3 && (
								<Badge className="text-xs" variant="outline">
									+{integration.subscribed_events.length - 3} more
								</Badge>
							)}
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-2 flex-shrink-0">
						{!isConnected && (
							<IntegrationDialog integration={integration} mode="create">
								<Button disabled={loading} size="sm">
									Connect
								</Button>
							</IntegrationDialog>
						)}

						{isConnected && (
							<>
								<IntegrationDialog
									installation={installation}
									integration={integration}
									mode="update"
								>
									<Button size="sm" variant="outline">
										Configure
									</Button>
								</IntegrationDialog>

								<DeleteIntegrationButton integrationId={installation.id}>
									<Button size="sm" variant="ghost">
										<Trash2 className="h-4 w-4 text-destructive" />
									</Button>
								</DeleteIntegrationButton>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
