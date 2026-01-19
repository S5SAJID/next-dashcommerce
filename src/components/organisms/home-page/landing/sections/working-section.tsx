export default function HomePageWorkingSection() {
	return (
		<section className="py-24 bg-background relative" id="how-it-works">
			<div className="max-w-7xl mx-auto px-6">
				<div className="mb-16 text-center max-w-2xl mx-auto">
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
						Launch before lunch.
					</h2>
					<p className="text-lg text-muted-foreground">
						We stripped away the complexity. You don't need to spend hours
						launching your online store.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
					<div className="bento-card group rounded-2xl border border-border bg-card p-8 flex flex-col shadow-sm hover:shadow-lg transition-shadow overflow-hidden relative">
						<div className="z-10 relative">
							<div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 flex items-center justify-center mb-6">
								<span className="font-bold text-lg">1</span>
							</div>
							<h3 className="text-xl font-bold mb-2">Add your products</h3>
							<p className="text-muted-foreground">
								Drag, drop, done. We automatically resize your images.
							</p>
						</div>
						<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[180px] bg-secondary rounded-t-xl border-t border-x border-border p-4 transition-transform group-hover:-translate-y-2 duration-300">
							<div className="border-2 border-dashed border-border rounded-lg h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
								<i className="w-8 h-8 opacity-50" data-feather="image" />
								<span className="text-xs">Drop image here</span>
							</div>
						</div>
					</div>
					<div className="bento-card group rounded-2xl border border-border bg-card p-8 flex flex-col shadow-sm hover:shadow-lg transition-shadow overflow-hidden relative">
						<div className="z-10 relative">
							<div className="w-12 h-12 rounded-lg bg-purple-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 flex items-center justify-center mb-6">
								<span className="font-bold text-lg">2</span>
							</div>
							<h3 className="text-xl font-bold mb-2">Share your link</h3>
							<p className="text-muted-foreground">
								Post to Instagram, TikTok, or WhatsApp instantly.
							</p>
						</div>
						<div className="absolute bottom-8 left-0 w-full px-8">
							<div className="bg-white dark:bg-zinc-800 border border-border rounded-full h-12 flex items-center px-4 shadow-sm translate-y-4 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
								<i
									className="w-4 h-4 mr-2 text-muted-foreground"
									data-feather="link"
								/>
								<span className="text-xs text-foreground font-mono">
									{/* Fix hardcoded URL */}
									yourstore.s5arc.store
								</span>
								<div className="ml-auto bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded">
									Copy
								</div>
							</div>
						</div>
					</div>
					<div className="bento-card group rounded-2xl border border-border bg-card p-8 flex flex-col shadow-sm hover:shadow-lg transition-shadow overflow-hidden relative">
						<div className="z-10 relative">
							<div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200 flex items-center justify-center mb-6">
								<span className="font-bold text-lg">3</span>
							</div>
							<h3 className="text-xl font-bold mb-2">Ship &amp; Earn</h3>
							<p className="text-muted-foreground">
								Manage COD orders and track your revenue growth.
							</p>
						</div>
						<div className="absolute bottom-0 right-0 w-[60%] h-[160px] bg-green-50/50 dark:bg-green-900/10 rounded-tl-full flex items-center justify-center">
							<div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-lg flex items-center gap-3 transform group-hover:scale-110 transition-transform duration-300">
								<div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
									<i className="w-6 h-6" data-feather="check" />
								</div>
								<div>
									<div className="text-xs text-muted-foreground">Collected</div>
									<div className="font-bold text-foreground">$1,240.00</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
