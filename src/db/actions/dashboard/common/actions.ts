"use server";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { uploadMultipleToCloudinary } from "@/lib/media-management/cloudinary/functions/upload";
import { CloudinaryUploadOptions } from "@/lib/media-management/cloudinary/types";
import { eq } from "drizzle-orm";

interface DashboardUploadResult {
	url: string;
	publicId: string;
}

export async function uploadDashboardFiles(
	files: File[],
	options: CloudinaryUploadOptions = { folder: "dashboard" }
): Promise<DashboardUploadResult[]> {
	const results = await uploadMultipleToCloudinary(files, options);

	return results.map((result) => ({
		url: result.url,
		publicId: result.publicId,
	}));
}

export async function checkDashboardSubdomainAvailability(
	subdomain: string
): Promise<{ isAvailable: boolean }> {
	// 1. Basic validation
	if (!subdomain || subdomain.length < 3) {
		return { isAvailable: false }; // Treat short/empty as unavailable or invalid
	}

	// 2. Query the database using Drizzle ORM
	const existingDomain = await db.query.StoreTable.findFirst({
		where: eq(StoreTable.domain, subdomain.toLowerCase()),
		columns: { id: true }, // Only fetch the ID for efficiency
	});

	// 3. Return the result
	return { isAvailable: !existingDomain };
}
