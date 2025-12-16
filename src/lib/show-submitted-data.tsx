import { toast } from "sonner";

export function showSubmittedData(
	data: unknown,
	title = "You submitted the following values:",
) {
	toast(title, {
		// w-[340px]
		description: (
			<pre className="mt-2 w-[330px] rounded-md bg-muted p-4 font-mono">
				<code className="text-muted-foreground">
					{JSON.stringify(data, null, 2)}
				</code>
			</pre>
		),
	});
}
