import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

type StoreFrontQuantityInput = {
	className?: string;
	value?: number;
	onChange: (value: number) => void;
};

export default function StoreFrontQuantityInput({
	value = 0,
	className,
	onChange,
}: StoreFrontQuantityInput) {
	return (
		<div
			className={cn(
				"flex h-9 items-center overflow-hidden rounded-full border border-input",
				className,
			)}
		>
			<Button
				className="size-6 rounded-full [&>svg]:stroke-primary/80 [&>svg]:hover:stroke-primary/60"
				disabled={value <= 0}
				onClick={() => onChange(value - 1)}
				size="icon"
				variant="ghost"
			>
				<Minus />
			</Button>
			<input
				className="size-6 rounded-none border-none p-0 text-center"
				readOnly
				value={value}
			/>
			<Button
				className="size-8 rounded-full [&>svg]:stroke-primary/80 [&>svg]:hover:stroke-primary/60"
				onClick={() => onChange(value + 1)}
				size="icon"
				variant="ghost"
			>
				<Plus />
			</Button>
		</div>
	);
}
