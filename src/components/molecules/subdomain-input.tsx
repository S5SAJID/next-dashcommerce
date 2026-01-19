"use client";
import { useSubdomainAvailability } from "@/hooks/dashboard/store/use-subdomain-availablity";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CheckCircle, Globe, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "../ui/input-group";

type DashboardSubdomainInputProps = React.ComponentProps<"div"> & {
	defaultValue?: string;
};

export default function DashboardSubdomainInput({
	className,
	defaultValue,
}: DashboardSubdomainInputProps) {
	const { setError, clearErrors, watch, control } = useFormContext();
	// watch for subdomain field changes
	const subdomainFormVal = watch("subdomain");
	// Debounced subdomain check
	const { status, error } = useSubdomainAvailability(
		subdomainFormVal,
		500,
		defaultValue,
	);

	useEffect(() => {
		if (status === "unavailable") {
			setError("subdomain", {
				type: "manual",
				message: `The subdomain "${subdomainFormVal}" is already taken.`,
			});
		} else if (status === "error") {
			setError("subdomain", {
				type: "manual",
				message: error ?? "An unexpected error occurred.",
			});
		} else {
			clearErrors("subdomain");
		}
	}, [status, error, subdomainFormVal]);

	return (
		<FormField
			control={control}
			name="subdomain"
			render={({ field }) => (
				<FormItem className={cn(className)}>
					<FormLabel>Subdomain *</FormLabel>
					<div className="relative">
						<div className="flex items-center">
							<FormControl>
								<InputGroup>
									<InputGroupInput
										placeholder="Enter your store subdomain"
										{...field}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupText>.s5arc.store</InputGroupText>
									</InputGroupAddon>
									<InputGroupAddon>
										{/* Status Indicator */}
										{status === "checking" ? (
											<Loader2 className="animate-spin" />
										) : status === "available" ? (
											<CheckCircle className=" text-green-500" />
										) : status === "idle" ? (
											<Globe />
										) : status === "unavailable" ? (
											<XCircle className=" text-red-500" />
										) : null}
									</InputGroupAddon>
								</InputGroup>
							</FormControl>
						</div>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
