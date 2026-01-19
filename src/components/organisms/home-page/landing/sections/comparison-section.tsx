import { Check, X } from "lucide-react";

export default function HomePageComparisonSection() {
	const comparisons = [
		{
			feature: "Setup Time",
			s5arc: "60 seconds",
			competitors: "Hours to days",
		},
		{
			feature: "Pricing",
			s5arc: "Free (Beta)",
			competitors: "$29-299/month",
		},
		{
			feature: "COD Support",
			s5arc: true,
			competitors: "Requires plugins",
		},
		{
			feature: "Coding Required",
			s5arc: false,
			competitors: "Often required",
		},
		{
			feature: "Custom Subdomain",
			s5arc: true,
			competitors: "Premium only",
		},
	];

	return (
		<section className="py-24 bg-background" id="comparison">
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
						Why choose S5ARC?
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Built specifically for small businesses and COD sellers. No bloat,
						no complexity, just what you need to start selling.
					</p>
				</div>

				<div className="overflow-hidden rounded-xl border border-border">
					<table className="w-full">
						<thead>
							<tr className="bg-muted/50">
								<th className="text-left p-4 font-semibold text-foreground">
									Feature
								</th>
								<th className="text-center p-4 font-semibold text-primary">
									S5ARC
								</th>
								<th className="text-center p-4 font-semibold text-muted-foreground">
									Traditional Platforms
								</th>
							</tr>
						</thead>
						<tbody>
							{comparisons.map((item, index) => (
								<tr
									key={index}
									className="border-t border-border hover:bg-muted/30 transition-colors"
								>
									<td className="p-4 font-medium text-foreground">
										{item.feature}
									</td>
									<td className="p-4 text-center">
										{typeof item.s5arc === "boolean" ? (
											item.s5arc ? (
												<Check className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto" />
											) : (
												<X className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto" />
											)
										) : (
											<span className="text-foreground font-semibold">
												{item.s5arc}
											</span>
										)}
									</td>
									<td className="p-4 text-center text-muted-foreground">
										{typeof item.competitors === "boolean" ? (
											item.competitors ? (
												<Check className="w-6 h-6 text-muted-foreground mx-auto" />
											) : (
												<X className="w-6 h-6 text-muted-foreground mx-auto" />
											)
										) : (
											item.competitors
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="mt-12 grid md:grid-cols-3 gap-6">
					<div className="text-center p-6">
						<h3 className="font-semibold text-foreground mb-2">
							Perfect for Pakistan & India
						</h3>
						<p className="text-sm text-muted-foreground">
							Built-in Cash on Delivery support for markets where COD is the
							preferred payment method
						</p>
					</div>
					<div className="text-center p-6">
						<h3 className="font-semibold text-foreground mb-2">
							No Technical Skills Needed
						</h3>
						<p className="text-sm text-muted-foreground">
							If you can use Instagram, you can use S5ARC. Simple, intuitive
							interface designed for everyone
						</p>
					</div>
					<div className="text-center p-6">
						<h3 className="font-semibold text-foreground mb-2">
							API for Developers
						</h3>
						<p className="text-sm text-muted-foreground">
							Need custom features? Use our REST API to build exactly what you
							need
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
