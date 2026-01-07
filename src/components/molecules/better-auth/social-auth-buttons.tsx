"use client";
import { authClient } from "@/lib/auth/auth-client";
import BetterAuthActionButton from "./action-button";
import { Github } from "lucide-react";
import { GoogleIcon } from "@/components/atoms/icons/google-icon";

// src/components/molecules/auth/social-auth-buttons.tsx
interface SocialAuthButtonsProps {
	isLoading?: boolean;
	callbackURL?: string;
}

export function SocialAuthButtons({
	isLoading = false,
	callbackURL = "/products",
}: SocialAuthButtonsProps) {
	return (
		<>
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

			<div className="grid gap-2 grid-cols-2">
				<BetterAuthActionButton
					action={() =>
						authClient.signIn.social({
							provider: "github",
							callbackURL,
						})
					}
					disabled={isLoading}
					successMessage="Redirecting to github..."
					type="button"
					variant="outline"
				>
					<Github className="h-4 w-4" /> GitHub
				</BetterAuthActionButton>
				<BetterAuthActionButton
					action={() =>
						authClient.signIn.social({
							provider: "google",
							callbackURL,
						})
					}
					disabled={isLoading}
					successMessage="Redirecting to google..."
					type="button"
					variant="outline"
				>
					<GoogleIcon className="h-4 w-4 fill-primary" /> Google
				</BetterAuthActionButton>
			</div>
		</>
	);
}
