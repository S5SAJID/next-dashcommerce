"use client";

import {
	type IntegrationDefinition,
	type IntegrationInstallation,
} from "@/db/schema/tables/integrations";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { type ReactNode, useState } from "react";
import { DynamicConfigForm } from "@/components/molecules/integrations/dynamic-config-form";
import {
	createIntegrationInstallation,
	updateIntegrationInstallation,
} from "@/db/actions/dashboard/integrations/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
	integration: IntegrationDefinition;
	installation?: IntegrationInstallation | null;
	mode: "create" | "update";
	children: ReactNode;
};

export function IntegrationDialog({
	integration,
	installation,
	mode,
	children,
}: Props) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	async function handleSubmit(config: Record<string, string>) {
		const promise =
			mode === "create"
				? createIntegrationInstallation({
						integrationId: integration.id,
						config,
					})
				: updateIntegrationInstallation({
						installationId: installation!.id,
						config,
					});

		toast.promise(promise, {
			loading: `${mode === "create" ? "Connecting to" : "Updating"} ${integration.name}...`,
			success: () => {
				setOpen(false);
				router.refresh();
				return `Successfully ${mode === "create" ? "connected to" : "updated"} ${integration.name}`;
			},
			error: (err) =>
				`Failed to ${mode === "create" ? "connect" : "update"}: ${err.message}`,
		});
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{mode === "create" ? "Connect to" : "Configure"} {integration.name}
					</DialogTitle>
					<DialogDescription>
						{integration.description || "Configure the integration settings"}
					</DialogDescription>
				</DialogHeader>

				<DynamicConfigForm
					initialValues={installation?.config || {}}
					onSubmit={(data) => handleSubmit(data)}
					schema={integration.config_schema}
					submitLabel={mode === "create" ? "Connect" : "Update"}
				/>
			</DialogContent>
		</Dialog>
	);
}
