import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageCtaSection() {
	return (
		<section className="py-24 border-t border-border bg-background">
			<div className="max-w-4xl mx-auto px-6 text-center space-y-8">
				<h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
					Ready to start your journey?
				</h2>
				<p className="text-xl text-muted-foreground">
					Be one of the entrepreneurs turning their passion into profit.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button
						asChild
						className="h-14 rounded-full text-lg"
						size="lg"
						variant="default"
					>
						<Link href="/signup">Start Selling for Free</Link>
					</Button>
					<Button
						asChild
						className="h-14 rounded-full text-lg"
						size="lg"
						variant="secondary"
					>
						<Link href="/api/v1/docs">API Docs</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
