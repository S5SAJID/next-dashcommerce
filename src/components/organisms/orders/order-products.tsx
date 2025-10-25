import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

type Product = {
	id: number;
	name: string;
	quantity: number;
	price: number;
	img: string;
};

export default function OrderProductsCard({
	products,
}: {
	products: Product[];
}) {
	return (
		<>
			<CardHeader>
				<CardTitle>Products</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
					<TableHeader>
						<TableRow>
							<TableHead className="mn-w-[100px] px-0">Name</TableHead>
							<TableHead>Quantity</TableHead>
							<TableHead className="px-0 text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell className="px-0 py-2">
									<div className="flex items-center space-x-4">
										<Image
											alt={product.name}
											className="h-8 w-8 rounded-md bg-muted"
											height={50}
											src={product.img}
											width={50}
										/>
										<Link
											className="hover:underline"
											href={`products/${product.id}`}
										>
											{product.name}
										</Link>
									</div>
								</TableCell>
								<TableCell>{product.quantity}</TableCell>
								<TableCell className="text-right">{product.price}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell className="text-right">$2,500.00</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</>
	);
}
