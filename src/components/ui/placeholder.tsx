export default function Placeholder({ text = "" }: { text?: string }) {
	return (
		<div className="flex h-full w-full items-center justify-center border bg-muted font-mono">
			{text}
		</div>
	);
}
