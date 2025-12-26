import HomePageNavbar from "@/components/organisms/home-page/landing/navbar";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";
import AuthPagesProviders from "@/providers/auth/providers";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: {
		template: "%s | S5ARC.", // %s will be replaced by the child page's title
		default: "S5ARC.", // Fallback title for pages without a specific title
	},
	icons: [
		{
			url: "/favico.svg",
		},
	],
};

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<HomePageNavbar showLinks={false} />
				<AuthPagesProviders>
					<div
						className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 font-[DM_Sans]"
						style={dmSans.style}
					>
						<div className="p-8">{children}</div>
						<div
							className={cn(
								"relative h-full pt-18 pb-6 px-6 overflow-hidden max-lg:hidden",
								"[&>img]:h-full [&>img]:w-full [&>img]:select-none [&>img]:object-cover [&>img]:object-top-left",
							)}
						>
							{/* <Image
							alt="S5ARC. Dashboard"
							className="dark:hidden"
							height={1152}
							src={"/assets/pages/signin/dashboard-light.png"}
							width={1024}
						/> */}
							<Image
								alt="S5ARC. Dashboard"
								className="block rounded-xl overflow-hidden "
								height={1140}
								loading="lazy"
								src={"/assets/pages/signin/dashboard-dark.png"}
								width={1024}
							/>
						</div>
					</div>
				</AuthPagesProviders>
				<Toaster />
			</ThemeProvider>
		</>
	);
}
