"use client";

import { deleteIntegrationInstallation } from "@/db/actions/dashboard/integrations/actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type ReactNode } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
	integrationId: string;
	children: ReactNode;
};

export function DeleteIntegrationButton({ integrationId, children }: Props) {
	const router = useRouter();

	async function handleDelete() {
		const promise = deleteIntegrationInstallation({
			installationId: integrationId,
		});

		toast.promise(promise, {
			loading: "Disconnecting integration...",
			success: () => {
				router.refresh();
				return "Integration disconnected successfully";
			},
			error: "Failed to disconnect integration",
		});
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Disconnect Integration?</AlertDialogTitle>
					<AlertDialogDescription>
						This will disconnect the integration from your store. You can
						reconnect it later if needed.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>
						Disconnect
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
