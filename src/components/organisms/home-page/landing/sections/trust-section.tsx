import { Check, Github, Lock, Zap } from "lucide-react";

export default function HomePageTrustSection() {
	return (
		<section className="py-8 bg-background border-y border-border">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{/* Open Source */}
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
							<Github className="w-5 h-5" />
						</div>
						<div className="text-lg font-bold text-foreground mb-0.5">
							Open Source
						</div>
						<p className="text-xs text-muted-foreground">AGPL-3.0 Licensed</p>
					</div>

					{/* Free Beta */}
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 mb-2">
							<Check className="w-5 h-5" />
						</div>
						<div className="text-lg font-bold text-foreground mb-0.5">
							100% Free
						</div>
						<p className="text-xs text-muted-foreground">During Beta</p>
					</div>

					{/* Secure */}
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2">
							<Lock className="w-5 h-5" />
						</div>
						<div className="text-lg font-bold text-foreground mb-0.5">
							Secure
						</div>
						<p className="text-xs text-muted-foreground">SSL Encrypted</p>
					</div>

					{/* Fast Setup */}
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-2">
							<Zap className="w-5 h-5" />
						</div>
						<div className="text-lg font-bold text-foreground mb-0.5">
							60 Seconds
						</div>
						<p className="text-xs text-muted-foreground">Average Setup</p>
					</div>
				</div>
			</div>
		</section>
	);
}
