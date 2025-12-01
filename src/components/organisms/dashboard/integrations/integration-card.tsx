"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getIntegrationInstallation } from "@/db/actions/dashboard/integrations/actions";
import { Trash2 } from "lucide-react";
import { DeleteIntegrationButton } from "./delete-integration-button";
import { IntegrationDialog } from "./integration-dialog";
import { type IntegrationDefinition } from "@/db/schema/tables/integrations";

type Props = {
	integration: IntegrationDefinition;
	isCustom?: boolean;
};

export function IntegrationCard({ integration, isCustom = false }: Props) {
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
		<Card className="flex flex-col">
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						{integration.logo_url && (
							<img
								alt={integration.name}
								className="w-10 h-10 rounded"
								src={integration.logo_url}
							/>
						)}
						<div>
							<CardTitle className="text-lg">{integration.name}</CardTitle>
							{isCustom && (
								<Badge className="mt-1" variant="secondary">
									Custom
								</Badge>
							)}
						</div>
					</div>
					{isConnected && (
						<Badge variant={isEnabled ? "default" : "outline"}>
							{isEnabled ? "Connected" : "Disabled"}
						</Badge>
					)}
				</div>
				<CardDescription className="mt-2">
					{integration.description || "No description available"}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex-1">
				<div className="text-sm text-muted-foreground">
					<p className="font-medium mb-1">Subscribed Events:</p>
					<div className="flex flex-wrap gap-1">
						{integration.subscribed_events.map((event) => (
							<Badge className="text-xs" key={event} variant="outline">
								{event}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex gap-2">
				{!isConnected && (
					<IntegrationDialog integration={integration} mode="create">
						<Button className="flex-1" disabled={loading}>
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
							<Button className="flex-1" variant="outline">
								Configure
							</Button>
						</IntegrationDialog>

						{isCustom && (
							<DeleteIntegrationButton integrationId={integration.id}>
								<Button size="icon" variant="destructive">
									<Trash2 className="h-4 w-4" />
								</Button>
							</DeleteIntegrationButton>
						)}
					</>
				)}
			</CardFooter>
		</Card>
	);
}
