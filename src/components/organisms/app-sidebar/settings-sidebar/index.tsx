"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { type JSX, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@bprogress/next";

type SettingsSidebarNavProps = React.HTMLAttributes<HTMLElement> & {
	items: {
		href: string;
		title: string;
		icon: JSX.Element;
	}[];
};

export default function SettingsSidebar({
	className,
	items,
	...props
}: SettingsSidebarNavProps) {
	const pathname = usePathname();
	const router = useRouter();
	const [currentURL, setcurrentURL] = useState(pathname ?? "/settings/store");

	const handleSelect = (newURL: string) => {
		setcurrentURL(newURL);
		router.push(newURL);
	};

	return (
		<>
			<div className="p-1 md:hidden">
				<Select onValueChange={handleSelect} value={currentURL}>
					<SelectTrigger className="h-12 sm:w-48">
						<SelectValue placeholder="Store" />
					</SelectTrigger>
					<SelectContent>
						{items.map((item) => (
							<SelectItem key={item.href} value={item.href}>
								<div className="flex gap-x-4 px-2 py-1">
									<span className="scale-125">{item.icon}</span>
									<span className="text-md">{item.title}</span>
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* TODO: Use scroll area here */}
			<div
				// orientation='horizontal'
				// type='always'
				className="hidden w-full min-w-40 bg-background px-1 py-2 md:block"
			>
				<nav
					className={cn(
						"flex space-x-2 py-1 lg:flex-col lg:space-x-0 lg:space-y-1",
						className,
					)}
					{...props}
				>
					{items.map((item) => (
						<Link
							className={cn(
								buttonVariants({ variant: "ghost" }),
								pathname === item.href
									? "bg-muted hover:bg-accent"
									: "hover:bg-accent hover:underline",
								"justify-start",
							)}
							href={item.href}
							key={item.href}
						>
							<span className="me-2">{item.icon}</span>
							{item.title}
						</Link>
					))}
				</nav>
			</div>
		</>
	);
}
