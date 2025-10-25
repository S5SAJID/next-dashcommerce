import { ForgotPasswordForm } from "@/components/organisms/forms/auth/forgot-password/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Forgot Password",
	description: "Reset your password",
};

export default function ForgotPasswordPage() {
	return (
		<div className="lg:p-8">
			<div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-4">
				<div className="flex flex-col space-y-2 text-start">
					<h2 className="font-semibold text-lg tracking-tight">
						Forgot Password
					</h2>
					<p className="text-muted-foreground text-sm">
						Enter your email below to reset your password.
					</p>
				</div>
				<ForgotPasswordForm />
			</div>
		</div>
	);
}
