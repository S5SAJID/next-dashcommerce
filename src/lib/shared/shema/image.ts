import { z } from "zod";

// Global constants for configuration
export const MAX_FILE_SIZE = 5_000_000; // 5MB

// Reusable schema for a single image file using Zod 4's native z.file()
// This properly handles File objects across the client-server boundary in Server Actions
export const imageFileSchema = z
	.file()
	.max(MAX_FILE_SIZE, "Max image size is 5MB.")
	.mime(
		["image/jpeg", "image/jpg", "image/png", "image/webp"],
		"Only .jpg, .jpeg, .png, and .webp formats are supported.",
	);

// Reusable schema for an array of image files (new uploads only)
export const imageFilesSchema = z.array(imageFileSchema);

// Schema for a single image that can be either a File (new upload) or a string URL (existing image)
export const imageSourceSchema = z.union([imageFileSchema, z.url()]);

// Schema for an array of mixed images (Files and/or string URLs)
// Use this for product update forms where existing images (URLs) and new uploads (Files) can coexist
export const mixedImagesSchema = z.array(imageSourceSchema);
