import { ThemeSwitch } from "@/components/molecules/theme-switch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePageNavbar({
	showLinks = true,
}: {
	showLinks?: boolean;
}) {
	return (
		<nav className="fixed top-0 w-full z-50 border-b border-border/40 backdrop-blur-md bg-background/80 transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				<div className="flex items-center">
					<div className="w-8 h-8 flex items-center justify-center">
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

				{showLinks ? (
					<>
						<div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
							<a
								className="hover:text-foreground hover:underline underline-offset-2 transition-colors"
								href="#how-it-works"
							>
								How It Works
							</a>
							<a
								className="hover:text-foreground hover:underline underline-offset-2 transition-colors"
								href="https://s5sajid.github.io"
								target="_blank"
							>
								About
							</a>
							<a
								className="hover:text-foreground hover:underline underline-offset-2 transition-colors"
								href="https://docs.s5arc.store"
								target="_blank"
							>
								Documentation
							</a>
						</div>

						<div className="flex items-center gap-4">
							<ThemeSwitch />
							<Link
								className="text-sm font-medium hover:text-primary hidden sm:block"
								href="/signin"
							>
								Log in
							</Link>
							<Button asChild>
								<Link href="/signup">Start Selling</Link>
							</Button>
						</div>
					</>
				) : null}
			</div>
		</nav>
	);
}
