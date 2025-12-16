"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	createCustomIntegration,
	validateEndpoint,
} from "@/db/actions/dashboard/integrations/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ConfigSchemaBuilder } from "@/components/molecules/integrations/config-schema-builder";
import { AVAILABLE_EVENTS } from "@/lib/events/event-types";

type Props = {
	children: ReactNode;
};

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
	slug: z
		.string()
		.min(1, "Slug is required")
		.regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
	description: z.string().optional(),
	logoUrl: z.url("Invalid URL").optional().or(z.literal("")),
	targetEndpointUrl: z.url("Invalid URL"),
	subscribedEvents: z.array(z.string()).min(1, "Select at least one event"),
	configSchema: z.array(z.any()),
});

type FormData = z.infer<typeof formSchema>;

export function CreateCustomIntegrationDialog({ children }: Props) {
	const [open, setOpen] = useState(false);
	const [validationResult, setValidationResult] = useState<any>(null);
	const [isValidating, setIsValidating] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subscribedEvents: [],
			configSchema: [],
		},
	});

	const targetEndpointUrl = watch("targetEndpointUrl");
	const subscribedEvents = watch("subscribedEvents");
	const configSchema = watch("configSchema");

	async function handleValidateEndpoint() {
		if (!targetEndpointUrl) {
			toast.error("Please enter an endpoint URL first");
			return;
		}

		const promise = validateEndpoint({ url: targetEndpointUrl });

		setIsValidating(true);
		toast.promise(promise, {
			loading: "Validating endpoint...",
			success: (result) => {
				setValidationResult(result.data);
				setIsValidating(false);
				if (result.data?.isValid) {
					return "Endpoint validation successful";
				}
				return "Endpoint validation completed with warnings";
			},
			error: () => {
				setIsValidating(false);
				return "Failed to validate endpoint";
			},
		});
	}

	async function onSubmit(data: FormData) {
		// Ensure endpoint is validated
		if (!validationResult?.isValid) {
			toast.error("Please validate the endpoint URL first");
			return;
		}

		const promise = createCustomIntegration(data);

		toast.promise(promise, {
			loading: "Creating custom integration...",
			success: (result) => {
				if (result.data?.success) {
					setOpen(false);
					router.refresh();
					return "Custom integration created successfully";
				}
				throw new Error(result.data?.error || "Failed to create integration");
			},
			error: (err) => `Failed to create integration: ${err.message}`,
		});
	}

	function toggleEvent(event: string) {
		const current = subscribedEvents || [];
		const updated = current.includes(event)
			? current.filter((e) => e !== event)
			: [...current, event];
		setValue("subscribedEvents", updated);
	}

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Custom Integration</DialogTitle>
					<DialogDescription>
						Create a custom integration that connects to your own API endpoint
					</DialogDescription>
				</DialogHeader>

				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{/* Basic Information */}
					<div className="space-y-4">
						<h3 className="font-semibold">Basic Information</h3>

						<div className="space-y-2">
							<Label htmlFor="name">
								Name <span className="text-destructive">*</span>
							</Label>
							<Input
								id="name"
								{...register("name")}
								placeholder="My Custom Integration"
							/>
							{errors.name && (
								<p className="text-sm text-destructive">
									{errors.name.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="slug">
								Slug <span className="text-destructive">*</span>
							</Label>
							<Input
								id="slug"
								{...register("slug")}
								placeholder="my-custom-integration"
							/>
							{errors.slug && (
								<p className="text-sm text-destructive">
									{errors.slug.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								{...register("description")}
								rows={2}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="logoUrl">Logo URL</Label>
							<Input id="logoUrl" type="url" {...register("logoUrl")} />
							{errors.logoUrl && (
								<p className="text-sm text-destructive">
									{errors.logoUrl.message}
								</p>
							)}
						</div>
					</div>

					{/* Endpoint Configuration */}
					<div className="space-y-4">
						<h3 className="font-semibold">Endpoint Configuration</h3>

						<div className="space-y-2">
							<Label htmlFor="targetEndpointUrl">
								Target Endpoint URL <span className="text-destructive">*</span>
							</Label>
							<div className="flex gap-2">
								<Input
									id="targetEndpointUrl"
									type="url"
									{...register("targetEndpointUrl")}
									placeholder="https://api.example.com/webhook"
								/>
								<Button
									disabled={isValidating || !targetEndpointUrl}
									onClick={handleValidateEndpoint}
									type="button"
									variant="outline"
								>
									{isValidating ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										"Validate"
									)}
								</Button>
							</div>
							{errors.targetEndpointUrl && (
								<p className="text-sm text-destructive">
									{errors.targetEndpointUrl.message}
								</p>
							)}
						</div>

						{/* Validation Results */}
						{validationResult && (
							<Alert
								variant={validationResult.isValid ? "default" : "destructive"}
							>
								<div className="flex items-start gap-2">
									{validationResult.isValid ? (
										<CheckCircle2 className="h-5 w-5 text-green-600" />
									) : (
										<AlertCircle className="h-5 w-5" />
									)}
									<div className="flex-1">
										<AlertDescription>
											{validationResult.isValid ? (
												<>
													<p className="font-medium">Endpoint is valid</p>
													{validationResult.warnings?.length > 0 && (
														<ul className="mt-2 text-sm list-disc list-inside">
															{validationResult.warnings.map(
																(warning: string, i: number) => (
																	<li key={i}>{warning}</li>
																),
															)}
														</ul>
													)}
												</>
											) : (
												<>
													<p className="font-medium">Validation failed</p>
													<ul className="mt-2 text-sm list-disc list-inside">
														{validationResult.errors?.map(
															(error: string, i: number) => (
																<li key={i}>{error}</li>
															),
														)}
													</ul>
												</>
											)}
										</AlertDescription>
									</div>
								</div>
							</Alert>
						)}
					</div>

					{/* Subscribed Events */}
					<div className="space-y-4">
						<h3 className="font-semibold">
							Subscribed Events <span className="text-destructive">*</span>
						</h3>
						<p className="text-sm text-muted-foreground">
							Select which events should trigger this integration
						</p>

						<div className="grid grid-cols-2 gap-3">
							{AVAILABLE_EVENTS.map((event) => (
								<div className="flex items-center space-x-2" key={event}>
									<Checkbox
										checked={subscribedEvents?.includes(event)}
										id={event}
										onCheckedChange={() => toggleEvent(event)}
									/>
									<Label
										className="text-sm font-normal cursor-pointer"
										htmlFor={event}
									>
										{event}
									</Label>
								</div>
							))}
						</div>
						{errors.subscribedEvents && (
							<p className="text-sm text-destructive">
								{errors.subscribedEvents.message}
							</p>
						)}
					</div>

					{/* Config Schema */}
					<div className="space-y-4">
						<h3 className="font-semibold">Configuration Schema</h3>
						<p className="text-sm text-muted-foreground">
							Define what configuration fields users need to provide
						</p>

						<ConfigSchemaBuilder
							onChange={(schema) => setValue("configSchema", schema)}
							value={configSchema}
						/>
					</div>

					<div className="flex gap-2">
						<Button
							className="flex-1"
							disabled={isSubmitting || !validationResult?.isValid}
							type="submit"
						>
							{isSubmitting ? "Creating..." : "Create Integration"}
						</Button>
						<Button
							onClick={() => setOpen(false)}
							type="button"
							variant="outline"
						>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
