import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getDashboadStoreDomain } from "@/db/actions/dashboard/settings/layout/actions";
import { applyCache, tags } from "@/lib/cache/cache-manager";
import { Store } from "lucide-react";
import { cacheTag } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DashboardStoreOpenButton() {
	"use cache: private";
	const { data: store } = await getDashboadStoreDomain();
	if (!store) {
		notFound();
	}

	applyCache(tags.store(store.id));

	const baseDomain = (
		process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
	).split("//")[1];

	const storeUrl = `http://${store.domain}.${baseDomain}`;

	return (
		<Tooltip>
			<TooltipTrigger>
				<Button asChild size="icon" variant="ghost">
					<Link href={storeUrl} prefetch={false} target="_blank">
						<Store />
					</Link>
				</Button>
			</TooltipTrigger>
			<TooltipContent>Open Store</TooltipContent>
		</Tooltip>
	);
}
