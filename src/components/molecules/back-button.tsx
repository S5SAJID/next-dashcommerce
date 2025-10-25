"use client";

import { useRouter } from "@bprogress/next";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
	const router = useRouter();

	return (
		<Button
			className="w-8"
			onClick={() => router.back()}
			size="sm"
			type="button"
			variant="ghost"
		>
			<ArrowLeft />
		</Button>
	);
}
