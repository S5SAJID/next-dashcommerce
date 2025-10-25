import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderShippingCard({
	shipping,
}: {
	shipping: {
		name: string;
		address1: string;
		city: string;
		state?: string;
		zip?: string;
		country: string;
		method?: string;
		tracking?: string;
	};
}) {
	return (
		<>
			<CardHeader>
				<CardTitle>Shipping</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 text-sm">
				<div className="space-y-0.5">
					<div className="font-medium">{shipping.name}</div>
					<div className="text-muted-foreground">
						{shipping.address1}
						{/* {shipping.address2 ? `, ${shipping.address2}` : ""} */}
					</div>
					<div className="text-muted-foreground">
						{shipping.city}
						{shipping.state ? `, ${shipping.state}` : ""}{" "}
						{shipping.zip ? shipping.zip : ""}
					</div>
					<div className="text-muted-foreground">{shipping.country}</div>
				</div>

				{shipping.method && (
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Method</span>
						<span className="font-medium">{shipping.method}</span>
					</div>
				)}
				{shipping.tracking && (
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Tracking</span>
						<a
							aria-label={`Tracking ${shipping.tracking}`}
							className="font-medium underline underline-offset-4"
							href="#"
						>
							{shipping.tracking}
						</a>
					</div>
				)}
			</CardContent>
		</>
	);
}
