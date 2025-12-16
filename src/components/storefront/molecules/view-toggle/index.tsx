"use client";

import { Button } from "@/components/ui/button";
import { LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";

type ViewMode = "default" | "dense";

export default function ViewToggle() {
	const [viewMode, setViewMode] = useQueryState(
		"view",
		parseAsStringEnum<ViewMode>(["default", "dense"]).withDefault("default"),
	);

	return (
		<div className="flex items-center gap-0.5 rounded-md border">
			<Button
				onClick={() => setViewMode("default")}
				size="sm"
				variant={viewMode === "default" ? "secondary" : "ghost"}
			>
				<LayoutListIcon className="size-4" />
				<span className="sr-only">Default view</span>
			</Button>
			<Button
				onClick={() => setViewMode("dense")}
				size="sm"
				variant={viewMode === "dense" ? "secondary" : "ghost"}
			>
				<LayoutGridIcon className="size-4" />
				<span className="sr-only">Dense view</span>
			</Button>
		</div>
	);
}
