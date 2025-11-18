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
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
		defaultValue
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
								<Input placeholder="Enter your store subdomain" {...field} />
							</FormControl>
							{/* Status Indicator */}
							{status === "checking" ? (
								<Loader2 className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 animate-spin text-primary" />
							) : status === "available" ? (
								<CheckCircle className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 text-green-500" />
							) : null}
						</div>
					</div>
					<FormMessage />
					<FormDescription>
						This subdomain will form your store&apos;s url. eg: acme -{">"}{" "}
						acme.eco.com
					</FormDescription>
				</FormItem>
			)}
		/>
	);
}
