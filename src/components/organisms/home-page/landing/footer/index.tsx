import Image from "next/image";

export default function HomePageFooter() {
	return (
		<footer className="py-12 border-t border-border bg-muted/20">
			<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
				<div className="flex items-center gap-2">
					<div className="flex items-center">
						<div className="w-6 h-6 flex items-center justify-center">
							<Image
								alt="S5ARC. Logo"
								className="dark:invert"
								height={22}
								src="/favico-black.svg"
								width={22}
							/>
						</div>
						<span className="font-semibold text-xl tracking-tight">S5ARC.</span>
					</div>
					<span className="font-bold text-foreground">© 2025</span>
				</div>
				<div className="flex gap-6 text-sm text-muted-foreground">
					<a className="hover:text-foreground" href="#">
						Privacy
					</a>
					<a className="hover:text-foreground" href="#">
						Terms
					</a>
					<a className="hover:text-foreground" href="#">
						Twitter
					</a>
				</div>
			</div>
		</footer>
	);
}
