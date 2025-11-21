"use server";

import { revalidatePath } from "next/cache";

export async function refreshPathUtil(path: string) {
	revalidatePath(path, "page");
}
