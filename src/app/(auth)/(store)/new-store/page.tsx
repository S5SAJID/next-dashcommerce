import { StoreCreateForm } from "@/components/organisms/forms/auth/create-store";
import { auth } from "@/lib/auth/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Create your store",
	description: "Create your new store",
};

export default async function NewStorePage() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		redirect("/signin");
	}
	const user = session.user;

	if (!user.emailVerified) {
		return (
			<div className="lg:p-8">
				<div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-4">
					<div className="flex flex-col space-y-2 text-start">
						<h2 className="font-semibold text-lg tracking-tight">
							First verify your email
						</h2>
						<p className="text-muted-foreground text-sm">
							You need to verify your email address before creating a store.{" "}
							<br />
							Please check your inbox for a verification email.
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (user.storeId != null) {
		redirect("/products");
	}

	return (
		<div className="lg:p-8">
			<div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-4">
				<div className="flex flex-col space-y-2 text-start">
					<h2 className="font-semibold text-lg tracking-tight">
						Create your store
					</h2>
					<p className="text-muted-foreground text-sm">
						Let&apos;s fill the form to make your online store.
					</p>
				</div>
				<StoreCreateForm />
			</div>
		</div>
	);
}
