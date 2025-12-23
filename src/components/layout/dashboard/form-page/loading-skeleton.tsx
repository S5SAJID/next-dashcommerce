import { Spinner } from "@/components/ui/spinner";

export function FormPageLoadingSkeleton() {
	return (
		<div className="w-full h-full flex gap-1 items-center justify-center">
			<Spinner /> <span>Loading...</span>
		</div>
	);
}
