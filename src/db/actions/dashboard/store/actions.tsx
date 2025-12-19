"use server";
import { storeFormSchema } from "@/components/organisms/forms/auth/create-store/schema";
import { db } from "@/db/db";
import { StoreTable, user } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import { noAuthdashboardActionClient } from "@/lib/safe-action-clients/dashboard-client/no-auth-dashboard-client";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createDashboardStore = noAuthdashboardActionClient
	.inputSchema(storeFormSchema)
	.action(async ({ parsedInput }) => {
		const { name, description, subdomain, currency } = parsedInput;

		const store = await db
			.insert(StoreTable)
			.values({
				name,
				domain: subdomain,
				currency,
				settings: {
					seo: {
						title: `${name} | The Best Premium Products Online`,
						description: `Welcome to ${name}, your go-to destination for high-quality and premium products. Shop now and experience the best in online shopping. ${description}`,
						tags: ["premium products", "cloths", name],
					},
					heroSection: {
						title: "Fast, Quick and Easy",
						description: `Discover our exclusive range of premium products designed to meet your needs. Enjoy top-notch quality and exceptional service at ${name}.`,
						image:
							"/storefront/demo/products/Default_product_imag_of_a_yellow_bag_for_ecommerce_website_1-3dgyNymA8r5pCl7OG4nEirKWxLjj3Y.jpg",
						ctaText: "Shop Now",
						ctaLink: "/products",
						ctaTarget: "self",
					},
				},
			})
			.returning({ id: StoreTable.id });

		const session = await auth.api.getSession({ headers: await headers() });

		if (!session) {
			redirect("/signin");
		}

		await db
			.update(user)
			.set({ storeId: store[0].id })
			.where(eq(user.id, session.user.id));
	});
