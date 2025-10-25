"use client";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@bprogress/next/app";

export default function AuthPagesProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProgressProvider color="var(--foreground)" spinnerPosition="bottom-right">
			{children}
			<Toaster />
		</ProgressProvider>
	);
}
