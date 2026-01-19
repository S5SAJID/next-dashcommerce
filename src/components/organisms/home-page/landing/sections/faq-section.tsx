export default function HomePageFaqSection() {
	const faqs = [
		{
			question: "Is S5ARC really free to use?",
			answer:
				"Yes, S5ARC is currently in beta and completely free. You can create your store, add unlimited products, and start selling without any credit card or payment required.",
		},
		{
			question: "Do I need coding skills to use S5ARC?",
			answer:
				"No coding skills required. S5ARC is built for non-technical founders and small business owners. Simply add your products, customize your store name, and share your link.",
		},
		{
			question: "What is Cash on Delivery (COD) and does S5ARC support it?",
			answer:
				"Cash on Delivery means your customers pay when they receive the product, not online. Yes, S5ARC is specifically built for COD businesses popular in Pakistan, India, and other South Asian markets.",
		},
		{
			question: "How long does it take to set up my online store?",
			answer:
				"You can have your store live in under 60 seconds. Create an account, claim your store name, add your first product, and you're ready to share your link.",
		},
		{
			question: "Can I use my own domain name?",
			answer:
				"Currently, you get a free subdomain like yourstore.s5arc.store. Custom domain support is on our roadmap for future updates.",
		},
		{
			question: "What features are included in the free plan?",
			answer:
				"You get unlimited products, order management, customer tracking, COD payment support, image hosting, and your own storefront. No hidden fees or limitations during beta.",
		},
		{
			question: "Which countries is S5ARC best suited for?",
			answer:
				"S5ARC works globally, but it's particularly optimized for Cash on Delivery businesses in Pakistan, India, Bangladesh, and other markets where COD is the preferred payment method.",
		},
		{
			question: "Can I integrate S5ARC with other tools?",
			answer:
				"Yes! We provide a REST API for developers to build custom integrations. You can connect S5ARC with your existing tools or build custom workflows.",
		},
	];

	return (
		<section className="py-24 bg-muted/30" id="faq">
			<div className="max-w-4xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-muted-foreground">
						Everything you need to know about starting your online store
					</p>
				</div>

				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<details
							key={index}
							className="group rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
						>
							<summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-foreground">
								<h3 className="text-lg">{faq.question}</h3>
								<span className="ml-4 flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											d="M19 9l-7 7-7-7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
										/>
									</svg>
								</span>
							</summary>
							<p className="mt-4 text-muted-foreground leading-relaxed">
								{faq.answer}
							</p>
						</details>
					))}
				</div>

				<div className="mt-12 text-center p-6 rounded-lg border border-border bg-card">
					<p className="text-muted-foreground mb-3">Still have questions?</p>
					<a
						className="text-primary hover:underline font-medium"
						href="https://github.com/S5SAJID/next-dashcommerce/discussions"
						rel="noopener noreferrer"
						target="_blank"
					>
						Ask in our Community →
					</a>
				</div>
			</div>
		</section>
	);
}
