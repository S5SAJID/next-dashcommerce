"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

const formSchema = z.object({
	email: z.email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormSchema = z.infer<typeof formSchema>;

export function ForgotPasswordForm({
	className,
	...props
}: React.HTMLAttributes<HTMLFormElement>) {
	const form = useForm<ForgotPasswordFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});
	const isLoading = form.formState.isSubmitting;

	async function onSubmit(data: ForgotPasswordFormSchema) {
		await authClient.requestPasswordReset(
			{ email: data.email, redirectTo: "/reset-password" },
			{
				onError: ({ error }) => {
					toast.error(error.message || "Something went wrong");
				},
				onSuccess: () => {
					toast.info("Password reset link sent.", {
						description: (
							<span>
								A password reset link has been sent to{" "}
								<strong>{data.email}</strong>.
							</span>
						),
					});
				},
			},
		);
	}

	return (
		<Form {...form}>
			<form
				className={cn("grid gap-3 space-y-4", className)}
				onSubmit={form.handleSubmit(onSubmit)}
				{...props}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid">
					<Button className="mt-2" disabled={isLoading} type="submit">
						{isLoading ? <Loader className="animate-spin" /> : <Send />}
						Send Reset Link
					</Button>
					<Button asChild className="mt-2" disabled={isLoading} variant="link">
						<Link href="/signin">Remembered your password? Signin</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
