import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";

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
					<h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
						Start your online store{" "}
						<span className="text-muted-foreground">in seconds.</span>
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
								<InputGroupText>.s5arc.vercel.app</InputGroupText>
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
				<div className="relative flex justify-center lg:justify-end perspective-1000">
					<div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-60 scale-75 -z-10 animate-pulse-slow" />
					<div className="iphone-frame rounded-xl w-[280px] h-[580px] border-[6px] border-black bg-white relative z-10 phone-mockup">
						<div className="iphone-notch bg-primary absolute -translate-x-2/4 w-6/12 h-6 z-20 rounded-br-xl rounded-bl-xl left-2/4 top-0" />
						<div className="h-full w-full overflow-hidden flex flex-col bg-gray-50 rounded-xl">
							<div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 pt-4">
								<div className="w-6 h-6 rounded bg-black" />
								<div className="w-6 h-6 rounded-full border border-gray-200" />
							</div>
							<div className="h-48 bg-gray-200 w-full relative group">
								<div className="absolute inset-0 flex items-center justify-center text-gray-400">
									<span className="text-xs uppercase tracking-widest">
										Product Image
									</span>
								</div>
								<div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold shadow-sm">
									New Arrival
								</div>
							</div>
							<div className="p-5 flex-grow space-y-4 bg-white">
								<div className="space-y-2">
									<div className="h-6 w-3/4 bg-gray-900 rounded" />
									<div className="h-4 w-1/2 bg-gray-400 rounded" />
								</div>
								<div className="flex items-center gap-2 pt-2">
									<span className="text-lg font-bold text-black">$49.00</span>
									<span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
										In Stock
									</span>
								</div>
								<div className="h-px w-full bg-gray-100 my-4" />
								<div className="space-y-3">
									<div className="flex justify-between text-xs text-gray-500">
										<span>Size</span>
										<span>Select guide</span>
									</div>
									<div className="flex gap-2">
										<div className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-xs">
											S
										</div>
										<div className="w-10 h-10 rounded border border-black bg-black text-white flex items-center justify-center text-xs">
											M
										</div>
										<div className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center text-xs">
											L
										</div>
									</div>
								</div>
							</div>
							<div className="p-4 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
								<button className="w-full bg-black text-white h-12 rounded-lg font-bold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 phone-buy-btn">
									<span>Add to Cart</span>
									<i className="w-4 h-4" data-feather="arrow-right" />
								</button>
								<div className="text-[10px] text-center text-gray-400 mt-2">
									Free shipping on all orders
								</div>
							</div>
						</div>
					</div>
					<div className="absolute top-20 -left-12 bg-white/90 backdrop-blur p-3 rounded-lg shadow-xl border border-gray-100 flex items-center gap-3 z-20 notification-card opacity-0">
						<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
							<i className="w-4 h-4" data-feather="dollar-sign" />
						</div>
						<div>
							<div className="text-xs font-bold text-gray-900">
								New Order #2024
							</div>
							<div className="text-[10px] text-gray-500">
								Paid via Cash on Delivery
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
