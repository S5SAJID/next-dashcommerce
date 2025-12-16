"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
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
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";

const formSchema = z
	.object({
		password: z.string().min(7, "Password must be at least 7 characters long"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type ResetPasswordFormSchema = z.infer<typeof formSchema>;

export function ResetPasswordForm({
	className,
	...props
}: React.HTMLAttributes<HTMLFormElement>) {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const error = searchParams.get("error");

	const form = useForm<ResetPasswordFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const isLoading = form.formState.isSubmitting;
	const router = useRouter();

	async function onSubmit(data: ResetPasswordFormSchema) {
		if (!token) {
			toast.error("Invalid password reset link.");
			return;
		}
		await authClient.resetPassword(
			{ newPassword: data.password, token },
			{
				onError: ({ error: authError }) => {
					toast.error(authError.message || "Something went wrong");
				},
				onSuccess: () => {
					toast.success("Password reset successfully!", {
						description: "Redirecting to login page...",
						duration: 2000,
					});
					router.push("/signin");
				},
			},
		);
	}

	if (error != null || token == null) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<h2 className="font-semibold text-lg tracking-tight">Invalid Link</h2>
				<p className="text-muted-foreground text-sm">
					The password reset link is invalid or has expired.
				</p>
			</div>
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
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid">
					<Button className="mt-2" disabled={isLoading} type="submit">
						{isLoading ? <Loader className="animate-spin" /> : null}
						Reset Password
					</Button>
				</div>
			</form>
		</Form>
	);
}
