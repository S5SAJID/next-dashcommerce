export default function HomePageDevelopersSection() {
	return (
		<section className="py-32 dark relative overflow-hidden" id="developers">
			<div
				className="absolute inset-0 bg-background transition-colors duration-700 -z-10"
				id="dev-bg-target"
			/>
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-16 items-start">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
							<span>API v1.0</span>
							<span className="h-3 w-px bg-blue-500/20" />
							<span>Stable</span>
						</div>
						<h2 className="text-4xl font-bold text-primary tracking-tight font-sans">
							For Developers &amp; Agencies: <br />
							<span className="text-muted-foreground">
								We didn't forget you.
							</span>
						</h2>
						<p className="text-lg text-muted-foreground font-light">
							Need more than the basics? S5ARC is headless-capable. Build custom
							storefronts with Next.js, Vue, or Svelte while we handle the
							checkout and inventory logic.
						</p>
						<div className="grid lg:grid-cols-2 gap-6 pt-4">
							<div className="border-l border-border hover:border-primary pl-4">
								<h4 className="font-bold text-foreground mb-1">Webhooks</h4>
								<p className="text-sm text-muted-foreground">
									Real-time events for order creation, updates, and inventory
									changes.
								</p>
							</div>
							<div className="border-l border-border hover:border-primary pl-4">
								<h4 className="font-bold text-foreground mb-1">OpenAPI Spec</h4>
								<p className="text-sm text-muted-foreground">
									Fully typed REST API with comprehensive documentation.
								</p>
							</div>
						</div>
						<button className="flex items-center gap-2 text-foreground font-mono text-sm hover:underline underline-offset-4 mt-4">
							Read the Documentation{" "}
							<i className="w-4 h-4" data-feather="arrow-right" />
						</button>
					</div>
					<div className="relative group">
						<div className="code-window bg-muted rounded-xl overflow-hidden font-mono text-sm relative z-10">
							<div className="bg-secondary border-b border-white/10 px-4 py-3 flex items-center justify-between">
								<div className="flex gap-2">
									<div className="w-3 h-3 rounded-full bg-neutral-700" />
									<div className="w-3 h-3 rounded-full bg-neutral-600" />
									<div className="w-3 h-3 rounded-full bg-neutral-500" />
								</div>
								<div className="text-xs text-white/30">checkout.ts</div>
							</div>
							<div className="p-6 overflow-x-auto text-muted-foreground">
								<pre className="leading-relaxed">
									{`import { S5ARC } from '@s5arc/sdk';

const client = new S5ARC({
  apiKey: process.env.S5ARC_KEY
});

// Initialize Custom Checkout
export async function createOrder(cart) {
  const session = await client.checkout.create({
    items: cart.items,
    payment: {
      type: 'COD',
      currency: 'USD'
    },
    metadata: {
      source: 'nextjs-custom-front'
    }
  });

  return session.url;
}
`}
								</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
