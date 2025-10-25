import { ResetPasswordForm } from "@/components/organisms/forms/auth/reset-password/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset Password",
	description: "Reset your password",
};

export default function ResetPasswordPage() {
	return (
		<div className="lg:p-8">
			<div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-4">
				<div className="flex flex-col space-y-2 text-start">
					<h2 className="font-semibold text-lg tracking-tight">
						Reset Password
					</h2>
					<p className="text-muted-foreground text-sm">
						Enter your new password below.
					</p>
				</div>
				<ResetPasswordForm />
			</div>
		</div>
	);
}
