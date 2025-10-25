"use client";

import { ThemeProvider } from "../theme-provider";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export default function DashboardProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			<ProgressProvider
				color="var(--foreground)"
				spinnerPosition="bottom-right"
			>
				{children}
			</ProgressProvider>
		</ThemeProvider>
	);
}
