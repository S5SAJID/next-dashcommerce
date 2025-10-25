import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderCustomerCard({
	customer,
}: {
	customer: { full_name: string; email: string; phone?: string };
}) {
	return (
		<>
			<CardHeader>
				<CardTitle className="text-base md:text-lg">Customer</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Name</span>
					<span className="font-medium">{customer.full_name}</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Email</span>
					<a
						className="font-medium underline underline-offset-4"
						href={`mailto:${customer.email}`}
					>
						{customer.email}
					</a>
				</div>
				{customer.phone && (
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">Phone</span>
						<a
							className="font-medium underline underline-offset-4"
							href={`tel:${customer.phone}`}
						>
							{customer.phone}
						</a>
					</div>
				)}
			</CardContent>
		</>
	);
}
