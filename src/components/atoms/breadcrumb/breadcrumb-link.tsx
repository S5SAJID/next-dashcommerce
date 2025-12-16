import Link from "next/link";
import { cn } from "@/lib/utils";

type BreadcrumbLinkProps = {
	href: string;
	children: React.ReactNode;
	isActive?: boolean;
	className?: string;
};

export function BreadcrumbLink({
	href,
	children,
	isActive = false,
	className,
}: BreadcrumbLinkProps) {
	if (isActive) {
		return (
			<span className={cn("font-medium text-foreground text-sm", className)}>
				{children}
			</span>
		);
	}

	return (
		<Link
			className={cn(
				"text-muted-foreground text-sm transition-colors hover:text-foreground",
				className,
			)}
			href={href}
		>
			{children}
		</Link>
	);
}
