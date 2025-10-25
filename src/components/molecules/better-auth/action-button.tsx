import type { ComponentProps } from "react";
import { ActionButton } from "@/components/ui/action-button";

export default function BetterAuthActionButton({
	action,
	successMessage,
	...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
	action: () => Promise<{ error: null | { message?: string } }>;
	successMessage?: string;
}) {
	return (
		<ActionButton
			{...props}
			action={async () => {
				const result = await action();
				if (result.error) {
					return {
						error: true,
						message: result.error.message || "Something went wrong",
					};
				}
				return {
					error: false,
					message: successMessage || "Action completed successfully",
				};
			}}
		/>
	);
}
