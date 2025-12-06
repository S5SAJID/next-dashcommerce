"use server";

import type { UploadApiResponse } from "cloudinary";
import { cloudinaryClient } from "../client";
import type { CloudinaryUploadOptions, CloudinaryUploadResult } from "../types";

/**
 * Uploads a single file to Cloudinary.
 */
export async function uploadToCloudinary(
	file: File,
	options: CloudinaryUploadOptions = {}
): Promise<CloudinaryUploadResult> {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

	const uploadResult: UploadApiResponse = await new Promise(
		(resolve, reject) => {
			cloudinaryClient.uploader.upload(
				base64Data,
				{
					folder: options.folder ?? "uploads",
					resource_type: options.resourceType ?? "auto",
					transformation: options.transformation,
					public_id: options.publicId,
					overwrite: options.overwrite ?? false,
				},
				(error, result) => {
					if (error) {
						reject(new Error(`Cloudinary upload failed: ${error.message}`));
					} else if (result) {
						resolve(result);
					} else {
						reject(new Error("Cloudinary upload failed: No result returned"));
					}
				}
			);
		}
	);

	return {
		url: uploadResult.secure_url,
		publicId: uploadResult.public_id,
		originalFilename: uploadResult.original_filename ?? file.name,
		format: uploadResult.format,
		bytes: uploadResult.bytes,
		width: uploadResult.width,
		height: uploadResult.height,
		resourceType: uploadResult.resource_type,
	};
}

/**
 * Uploads multiple files to Cloudinary in parallel.
 */
export async function uploadMultipleToCloudinary(
	files: File[],
	options: CloudinaryUploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
	const uploadPromises = files.map((file) => uploadToCloudinary(file, options));
	return Promise.all(uploadPromises);
}
