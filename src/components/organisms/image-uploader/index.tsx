"use client";

import type React from "react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { ImageUploadItem } from "@/components/molecules/image-upload-item";
import { toast } from "sonner";

// Define a union type for images, allowing either a File object or a string URL
export type ImageSource = File | string;

// Type guard to check if an item is a File object
const isFile = (item: ImageSource): item is File => typeof item !== "string";

export type ImageUploaderProps = {
	images: ImageSource[];
	onImagesChange: (images: ImageSource[]) => void;
	maxImages?: number;
	maxFileSize?: number; // in bytes
	acceptedTypes?: string[];
	className?: string;
};

export function ImageUploader({
	images,
	onImagesChange,
	maxImages = 5,
	maxFileSize = 5 * 1024 * 1024, // 5MB default
	acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
	className,
}: ImageUploaderProps) {
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// ... (rest of the logic, unchanged)
	// [handleFileSelect, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleRemoveImage, handleAddImageClick, validateFile, canAddMore]

	const validateFile = useCallback(
		(file: File): string | null => {
			if (!acceptedTypes.includes(file.type)) {
				return `File type ${file.type} is not supported. Please use ${acceptedTypes.join(", ")}.`;
			}
			if (file.size > maxFileSize) {
				return `File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(1)}MB.`;
			}
			return null;
		},
		[acceptedTypes, maxFileSize],
	);

	const handleFileSelect = useCallback(
		(selectedFiles: FileList | null) => {
			if (!selectedFiles) {
				return;
			}

			const newFiles: File[] = [];
			const errors: string[] = [];

			Array.from(selectedFiles).forEach((file) => {
				const error = validateFile(file);
				if (error) {
					errors.push(`${file.name}: ${error}`);
				} else if (images.length + newFiles.length < maxImages) {
					newFiles.push(file);
				} else {
					errors.push(`Maximum ${maxImages} images allowed.`);
				}
			});

			if (errors.length > 0) {
				toast("Upload Error", {
					description: errors.join(" "),
				});
			}

			if (newFiles.length > 0) {
				onImagesChange([...images, ...newFiles]);
				toast("Images Added", {
					description: `${newFiles.length} image(s) uploaded successfully.`,
				});
			}
		},
		[images, maxImages, onImagesChange, validateFile],
	);

	const handleDragStart = (index: number) => {
		setDraggedIndex(index);
	};

	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		setDragOverIndex(index);
	};

	const handleDragLeave = () => {
		setDragOverIndex(null);
	};

	const handleDrop = (e: React.DragEvent, dropIndex: number) => {
		e.preventDefault();
		setDragOverIndex(null);

		if (draggedIndex === null || draggedIndex === dropIndex) {
			setDraggedIndex(null);
			return;
		}

		const newImages = [...images];
		const draggedImage = newImages[draggedIndex];
		newImages.splice(draggedIndex, 1);
		newImages.splice(dropIndex, 0, draggedImage);

		onImagesChange(newImages);
		setDraggedIndex(null);

		toast("Images reordered", {
			description: "Image order updated successfully.",
		});
	};

	const handleRemoveImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		onImagesChange(newImages);
		toast("Image Removed", {
			description: "Image removed successfully.",
		});
	};

	const handleAddImageClick = () => {
		fileInputRef.current?.click();
	};

	const canAddMore = images.length < maxImages;

	return (
		<div className={cn("space-y-4", className)}>
			<input
				accept={acceptedTypes.join(",")}
				className="hidden"
				multiple
				onChange={(e) => handleFileSelect(e.target.files)}
				ref={fileInputRef}
				type="file"
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{images.map((image, index) => {
					// Pass the image object directly, and the temporary URL for preview.
					const imagePreviewUrl = isFile(image)
						? URL.createObjectURL(image)
						: image;
					return (
						<ImageUploadItem
							imagePreviewUrl={imagePreviewUrl}
							imageSource={image} // Pass the original object (File or string)
							index={index} // Pass the URL for the preview
							isDragging={draggedIndex === index}
							isDragOver={dragOverIndex === index}
							isMain={index === 0}
							key={imagePreviewUrl}
							onDragLeave={handleDragLeave}
							onDragOver={(e) => handleDragOver(e, index)}
							onDragStart={() => handleDragStart(index)}
							onDrop={(e) => handleDrop(e, index)}
							onRemove={() => handleRemoveImage(index)}
						/>
					);
				})}

				{canAddMore && (
					<Card
						className={cn(
							"group aspect-square cursor-pointer border-2 border-muted-foreground/25 border-dashed transition-colors hover:border-muted-foreground/50",
							"flex flex-col items-center justify-center gap-2 p-4",
						)}
						onClick={handleAddImageClick}
					>
						<Upload className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-foreground" />
						<div className="text-center">
							<p className="font-medium text-muted-foreground text-sm transition-colors group-hover:text-foreground">
								Add Image
							</p>
							<p className="mt-1 text-muted-foreground text-xs">
								{images.length}/{maxImages}
							</p>
						</div>
					</Card>
				)}
			</div>
		</div>
	);
}
