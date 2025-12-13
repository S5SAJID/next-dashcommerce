import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type StoreFrontHeroProps = {
	title: string;
	description: string;
	cta: {
		link: string;
		text: string;
		target: "_blank" | "self";
	};
	image: {
		url: string;
		alt: string;
	};
};

export default function StoreFrontHero({
	title,
	description,
	cta,
	image,
}: StoreFrontHeroProps) {
	return (
		<Card className="flex aspect-square items-center gap-2 border-none bg-muted shadow-none md:aspect-[21/9] md:flex-row">
			<div className="w-full py-8 md:px-8">
				<CardHeader className="my-auto h-auto">
					<CardTitle className="text-4xl md:text-6xl tracking-tighter">
						{title}
					</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardFooter className="mt-4">
					<Button asChild>
						<Link href={cta.link} target={cta.target}>
							{cta.text}
						</Link>
					</Button>
				</CardFooter>
			</div>
			<div className="mr-8 hidden aspect-square overflow-hidden rounded bg-muted md:block">
				<Image
					alt={image.alt}
					className="h-full w-full rounded object-cover"
					height={450}
					src={image.url}
					width={450}
				/>
			</div>
		</Card>
	);
}
