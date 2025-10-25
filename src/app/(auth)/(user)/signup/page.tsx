import { UserAuthForm } from "@/components/organisms/forms/auth/signup/user-auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SignUp",
	description: "SignUp into your custom eco account",
};

export default function SignUpPage() {
	return (
		<div className="lg:p-8">
			<div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-4">
				<div className="flex flex-col space-y-2 text-start">
					<h2 className="font-semibold text-lg tracking-tight">
						Create account
					</h2>
					<p className="text-muted-foreground text-sm">
						Enter your email and password below to create your account.
					</p>
				</div>
				<UserAuthForm />
				<p className="px-8 text-center text-muted-foreground text-sm">
					By clicking sign up, you agree to our{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#terms"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#privacy"
					>
						Privacy Policy
					</a>
					.
				</p>
			</div>
		</div>
	);
}
