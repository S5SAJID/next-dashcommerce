export type CloudinaryUploadOptions = {
	folder?: string;
	resourceType?: "auto" | "image" | "video" | "raw";
	transformation?: Array<Record<string, string | number | boolean>>;
	publicId?: string;
	overwrite?: boolean;
};

export type CloudinaryUploadResult = {
	url: string;
	publicId: string;
	originalFilename: string;
	format: string;
	bytes: number;
	width?: number;
	height?: number;
	resourceType: string;
};
