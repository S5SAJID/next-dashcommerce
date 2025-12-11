export default function HomePageSocialProofSection() {
	return (
		<section className="py-10 border-y border-border/50 bg-secondary/30">
			<div className="max-w-7xl mx-auto px-6">
				<p className="text-center text-sm font-medium text-muted-foreground mb-8">
					Trusted by founders
				</p>
				<div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
					<div className="h-8 flex items-center font-bold text-xl font-sans tracking-tighter">
						AttaTijari
					</div>
					<div className="h-8 flex items-center font-bold text-xl font-serif">
						Remo
					</div>
					<div className="h-8 flex items-center font-bold text-xl font-mono">
						Rafia
					</div>
					<div className="h-8 flex items-center font-bold text-xl italic">
						Initech
					</div>
					<div className="h-8 flex items-center font-bold text-xl">
						Umbrella
					</div>
				</div>
			</div>
		</section>
	);
}
