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
		template: "%s | S5ARC.", // %s will be replaced by the child page's title
		default: "S5ARC.", // Fallback title for pages without a specific title
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
							<div className="flex items-center justify-center">
								{/* <h1 className="font-medium text-xl">S5ARC.</h1> */}
								<div className="h-8 flex item-center justify-center">
									<svg
										height="81.385%"
										viewBox="0 0 323.5 81.385"
										width="323.5%"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="Logo" transform="translate(-861.5 -528.557)">
											<g
												data-name="Group 2"
												id="Group_2"
												transform="translate(729.5 731.575)"
											>
												<path
													d="M20.346,44.693a20.346,20.346,0,1,1,40.693,0H81.385A40.693,40.693,0,1,0,40.693,85.385V65.039A20.346,20.346,0,0,1,20.346,44.693Z"
													data-name="Path 1"
													fill="var(--color-primary)"
													id="Path_1"
													transform="translate(132 -207.017)"
												/>
												<path
													d="M20,24H40.346V44.346H20Z"
													data-name="Path 2"
													fill="var(--color-primary)"
													id="Path_2"
													opacity="0.5"
													transform="translate(152.693 -186.325)"
												/>
												<path
													d="M44.9,34H30V48.9A40.893,40.893,0,0,0,44.9,34Z"
													data-name="Path 3"
													fill="var(--color-primary)"
													id="Path_3"
													transform="translate(163.039 -175.979)"
												/>
											</g>
											<text
												fill="var(--color-primary)"
												fontFamily="PPMori-SemiBold, PP Mori"
												fontSize="67"
												fontWeight="600"
												id="S5ARC."
												letterSpacing="-0.046em"
												transform="translate(956 593)"
											>
												<tspan x="0" y="0">
													S5ARC.
												</tspan>
											</text>
										</g>
									</svg>
								</div>
							</div>
						</div>
						{children}
					</div>
					<div
						className={cn(
							"relative h-full overflow-hidden bg-muted max-lg:hidden",
							"[&>img]:h-full [&>img]:w-full [&>img]:select-none [&>img]:object-cover [&>img]:object-top-left"
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
							className="block"
							height={1140}
							src={"/assets/pages/signin/dashboard-dark.png"}
							unoptimized
							width={1024}
						/>
					</div>
				</div>
			</AuthPagesProviders>
			<Toaster />
		</>
	);
}
