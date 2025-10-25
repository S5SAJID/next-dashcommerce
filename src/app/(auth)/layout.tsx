import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";
import AuthPagesProviders from "@/providers/auth/providers";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: {
		template: "%s | Custom Eco", // %s will be replaced by the child page's title
		default: "Custom Eco", // Fallback title for pages without a specific title
	},
	icons: [
		{
			url: "/favico.svg",
		},
	],
};

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({ headers: await headers() });

	if (session != null && session.user.storeId != null) {
		redirect("/products");
	}
	return (
		<>
			<AuthPagesProviders>
				<div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
					<div className="lg:p-8">
						<div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
							<div className="mb-4 flex items-center justify-center">
								<h1 className="font-medium text-xl">Custom Eco</h1>
							</div>
						</div>
						{children}
					</div>
					<div
						className={cn(
							"relative h-full overflow-hidden bg-muted max-lg:hidden",
							"[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:select-none [&>img]:object-cover [&>img]:object-top-left"
						)}
					>
						<Image
							alt="Custom Eco Dashboard"
							className="dark:hidden"
							height={1151}
							src={"/assets/pages/signin/dashboard-light.png"}
							width={1024}
						/>
						<Image
							alt="Custom Eco Dashboard"
							className="hidden dark:block"
							height={1138}
							src={"/assets/pages/signin/dashboard-dark.png"}
							width={1024}
						/>
					</div>
				</div>
			</AuthPagesProviders>
			<Toaster />
		</>
	);
}
