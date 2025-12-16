"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { checkoutFormSchema, type CheckoutFormSchemaType } from "./schema";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { checkoutFormAction } from "@/db/actions/storefront/order/checkout/action";
import { useCart } from "react-use-cart";
import { useRouter } from "@bprogress/next";
import { Spinner } from "@/components/ui/spinner";
import { toastPromise } from "@/hooks/use-promise-toaster";
import { CreditCard } from "lucide-react";

const checkoutFormDefault = {
	name: "",
	address: "",
	city: "",
	country: "",
	email: "",
	phone: "",
	postalCode: "",
	state: "",
};

export default function StoreFrontCheckoutForm() {
	const { items, emptyCart, cartTotal } = useCart();
	const router = useRouter();
	const form = useForm<CheckoutFormSchemaType>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			...checkoutFormDefault,
			cartItems: items.map((e) => ({ productId: e.id, quantity: e.quantity })),
		},
	});

	const handleSubmit = form.handleSubmit(
		async (data) => {
			await toastPromise(checkoutFormAction(data), {
				loading: "Submitting...",
				success: (response) => {
					const responseData = response.data;
					if (!(responseData?.success && responseData.orderId)) {
						throw new Error("Something went wrong. Please try again.");
					}
					const params = new URLSearchParams({
						orderId: responseData.orderId,
						itemCount: String(items.length ?? 0),
						total: cartTotal.toFixed(2),
						name: data.name,
						email: data.email,
						country: data.country,
						city: data.city,
					});
					emptyCart();
					router.push(`/checkout/success?${params.toString()}`);
					return "Order placed successfully!";
				},
				error: () => "Something went wrong. Please try again.",
			});
		},
		(errors) => {
			// put a friendlier toast with focused first error
			const firstErrorKey = Object.keys(errors)[0];
			toast.error("Please fix errors");
			const el = document.querySelector(
				`[name="${firstErrorKey}"]`,
			) as HTMLElement | null;
			el?.focus();
		},
	);
	return (
		<Form {...form}>
			<form className="space-y-8 pt-6 lg:pr-6" onSubmit={handleSubmit}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="AbdUllah Shah" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder="m@example.com" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-2 gap-2">
					<FormField
						control={form.control}
						name="postalCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postal Code</FormLabel>
								<FormControl>
									<Input {...field} placeholder="020201" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Karachi" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Texas" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* TODO::LEFT: Add Better UX */}
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a country" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{["Pakistan", "India", "Palesine", "Bangladesh"].map(
												(country) => (
													<SelectItem
														key={country}
														value={country.toLowerCase()}
													>
														{country}
													</SelectItem>
												),
											)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone number</FormLabel>
							<FormControl>
								<Input {...field} placeholder="+1 2222 23232 0" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Bloom street block IV, New York"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="rounded-lg border bg-muted/50 p-4">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
							<CreditCard />
						</div>
						<div className="flex flex-col">
							<span className="font-medium text-sm">Cash on Delivery</span>
							<span className="text-muted-foreground text-xs">
								Pay in cash upon delivery
							</span>
						</div>
					</div>
				</div>
				<Button
					className="mt-4 w-full rounded-full"
					disabled={form.formState.isSubmitting}
					size="lg"
					type="submit"
				>
					{form.formState.isSubmitting ? (
						<>
							<Spinner className="inline-block" /> Processing...
						</>
					) : (
						"Place Order"
					)}
				</Button>
				<FormField
					control={form.control}
					name="cartItems"
					render={() => (
						<FormItem>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
