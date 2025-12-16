/**
 * Generates a Cloudinary URL with transformations.
 */
export function getCloudinaryUrl(
	publicId: string,
	options: {
		width?: number;
		height?: number;
		crop?: "fill" | "fit" | "scale" | "crop" | "thumb";
		format?: "auto" | "webp" | "jpg" | "png" | "avif";
		quality?: "auto" | number;
	} = {},
): string {
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
	if (!cloudName) {
		throw new Error("CLOUDINARY_CLOUD_NAME is not defined");
	}

	const transforms: string[] = [];

	if (options.width) {
		transforms.push(`w_${options.width}`);
	}
	if (options.height) {
		transforms.push(`h_${options.height}`);
	}
	if (options.crop) {
		transforms.push(`c_${options.crop}`);
	}
	if (options.format) {
		transforms.push(`f_${options.format}`);
	}
	if (options.quality) {
		transforms.push(`q_${options.quality}`);
	}

	const transformStr = transforms.length > 0 ? `${transforms.join(",")}/` : "";

	return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}${publicId}`;
}
