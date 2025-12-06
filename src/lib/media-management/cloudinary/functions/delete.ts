"use server";

import { cloudinaryClient } from "../client";

/**
 * Deletes a file from Cloudinary by its public ID.
 */
export async function deleteFromCloudinary(
	publicId: string,
	resourceType: "image" | "video" | "raw" = "image"
): Promise<{ result: string }> {
	return new Promise((resolve, reject) => {
		cloudinaryClient.uploader.destroy(
			publicId,
			{ resource_type: resourceType },
			(error, result) => {
				if (error) {
					reject(new Error(`Cloudinary deletion failed: ${error.message}`));
				} else if (result) {
					resolve(result as { result: string });
				} else {
					reject(new Error("Cloudinary deletion failed: No result returned"));
				}
			}
		);
	});
}
