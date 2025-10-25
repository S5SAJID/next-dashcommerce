"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader, LogIn } from "lucide-react";
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
import BetterAuthActionButton from "@/components/molecules/better-auth/action-button";
import { toast } from "sonner";

const formSchema = z.object({
	email: z.email({
		error: (iss) => (iss.input === "" ? "Please enter your email" : undefined),
	}),
	password: z
		.string()
		.min(1, "Please enter your password")
		.min(7, "Password must be at least 7 characters long"),
});

type UserAuthFormSchema = z.infer<typeof formSchema>;

export function UserAuthForm({
	className,
	// redirectTo,
	...props
}: React.HTMLAttributes<HTMLFormElement>) {
	const form = useForm<UserAuthFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const isLoading = form.formState.isSubmitting;

	async function onSubmit(data: UserAuthFormSchema) {
		await authClient.signIn.email(
			{ email: data.email, password: data.password, callbackURL: "/products" },
			{
				onError: ({ error }) => {
					toast.error(error.message || "Something went wrong");
				},
				onSuccess: () => {
					toast.success(`Welcome back ${data.email}!`);
				},
			}
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
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="relative">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" type="password" {...field} />
							</FormControl>
							<FormMessage />
							<Link
								className="-top-0.5 absolute end-0 font-medium text-muted-foreground text-sm hover:opacity-75"
								href="/forgot-password"
							>
								Forgot password?
							</Link>
						</FormItem>
					)}
				/>
				<div className="grid">
					<Button className="mt-2" disabled={isLoading} type="submit">
						{isLoading ? <Loader className="animate-spin" /> : <LogIn />}
						Sign in
					</Button>
					<Button asChild className="mt-2" disabled={isLoading} variant="link">
						<Link href="/signup">Don&apos;t have an account? Sign up</Link>
					</Button>
				</div>

				<div className="relative my-2">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				{/* TODO: Add Google and make it 2 cols */}
				<div className="grid gap-2">
					<BetterAuthActionButton
						action={() =>
							authClient.signIn.social({
								provider: "github",
								callbackURL: "/products",
							})
						}
						disabled={isLoading}
						successMessage="Redirecting to github..."
						type="button"
						variant="outline"
					>
						<Github className="h-4 w-4" /> GitHub
					</BetterAuthActionButton>
					{/* <Button variant='outline' type='button' disabled={isLoading}>
            <Facebook className='h-4 w-4' /> Facebook
          </Button> */}
				</div>
			</form>
		</Form>
	);
}
