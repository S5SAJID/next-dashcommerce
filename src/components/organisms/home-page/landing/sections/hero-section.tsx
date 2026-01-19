"use client";
import CardSwapContainer, {
	CardSwapCard,
} from "@/components/molecules/third-party/CardSwap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { Code, LayoutDashboard, Store } from "lucide-react";
import Image from "next/image";

export default function HomePageHeroSection() {
	return (
		<section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
			<div className="absolute inset-0 -z-10 bg-grid-pattern opacity-30 h-full w-full" />
			<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
				<div className="hero-content space-y-8 z-10">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border">
						<span className="flex h-2 w-2 rounded-full bg-green-500" />
						v1.0 is now live: Cash on Delivery ready.
					</div>
					<h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-foreground leading-[1.1]">
						Build your free online store{" "}
						<span className="text-muted-foreground">in 60 seconds.</span>
					</h1>
					<p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
						The simplest platform to sell your products. Built specifically for
						Cash on Delivery businesses. No coding, no complex dashboards.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 max-w-md pt-4">
						<InputGroup className="h-10">
							<InputGroupInput placeholder="your store name"></InputGroupInput>
							<InputGroupAddon align="inline-end">
								{/* Fix hardcoded URL */}
								<InputGroupText>.s5arc.store</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
						<Button size="lg">Claim Store</Button>
					</div>
					<div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
						<div className="flex items-center gap-2">
							<i className="w-4 h-4 text-foreground" data-feather="check" />
							Free (Beta)
						</div>
						<div className="flex items-center gap-2">
							<i className="w-4 h-4 text-foreground" data-feather="check" />
							No credit card
						</div>
					</div>
				</div>
				<div className="relative flex justify-center lg:items-center h-full w-full lg:justify-end perspective-1000">
					<div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-60 scale-75 -z-10 animate-pulse-slow" />
					<div>
						{/* FIX: Make it responsive */}
						<CardSwapContainer height={500} verticalDistance={50} width={600}>
							<CardSwapCard>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-1">
											<LayoutDashboard className="size-4" /> Dashboard
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Image
											alt="Dashboard"
											className="border rounded-md"
											height={800}
											src="/assets/pages/home-page/hero-section/dashboard.png"
											width={800}
											priority
										/>
									</CardContent>
								</Card>
							</CardSwapCard>
							<CardSwapCard>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-1">
											<Store className="size-4" /> Store
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Image
											alt="Storefront"
											className="border rounded-md"
											height={800}
											loading="lazy"
											src="/assets/pages/home-page/hero-section/storefront.png"
											width={800}
										/>
									</CardContent>
								</Card>
							</CardSwapCard>
							<CardSwapCard>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-1">
											<Code className="size-4" /> Custom Development Supported
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Image
											alt="Developers API"
											className="border rounded-md"
											height={800}
											loading="lazy"
											src="/assets/pages/home-page/hero-section/api.png"
											width={800}
										/>
									</CardContent>
								</Card>
							</CardSwapCard>
						</CardSwapContainer>
					</div>
				</div>
			</div>
		</section>
	);
}
