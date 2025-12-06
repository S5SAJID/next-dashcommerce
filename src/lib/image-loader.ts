import { ImageLoaderProps } from "next/image";

export function customImageLoader({ src, width, quality }: ImageLoaderProps) {
	const transformations = `w_${width},q_${quality ?? 75},f_auto`;

	// If src is already a full Cloudinary URL, inject transformations after /upload/
	if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
		return src.replace("/upload/", `/upload/${transformations}/`);
	}

	// Otherwise, build a new Cloudinary URL from the relative path
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
	if (!cloudName) {
		throw new Error("CLOUDINARY_CLOUD_NAME is not defined");
	}

	const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

	return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${cleanSrc}`;
}

export const nextImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
};

export default function imagesLoader({
	src,
	width,
	quality,
}: ImageLoaderProps) {
	if (src.startsWith("/_next") || src.startsWith("/storefront")) {
		return nextImageLoader({ src, width, quality });
	}

	if (src.includes("https://res.cloudinary.com/")) {
		return customImageLoader({ src, width, quality });
	}

	return src;
}
