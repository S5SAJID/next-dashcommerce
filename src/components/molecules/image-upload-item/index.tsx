"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, GripVertical } from "lucide-react";
import Image from "next/image";

type ImageSource = File | string;

const isFile = (item: ImageSource): item is File => typeof item !== "string";

type ImageUploadItemProps = {
	imageSource: ImageSource; // The original object (File or string)
	imagePreviewUrl: string; // The URL for the preview
	index: number;
	isMain: boolean;
	isDragging: boolean;
	isDragOver: boolean;
	onDragStart: () => void;
	onDragOver: (e: React.DragEvent) => void;
	onDragLeave: () => void;
	onDrop: (e: React.DragEvent) => void;
	onRemove: () => void;
};

export function ImageUploadItem({
	imageSource,
	imagePreviewUrl, // Use the preview URL directly
	index,
	isMain,
	isDragging,
	isDragOver,
	onDragStart,
	onDragOver,
	onDragLeave,
	onDrop,
	onRemove,
}: ImageUploadItemProps) {
	// We no longer need state for imageUrl or a useEffect to create the URL,
	// as the parent passes the correct preview URL directly.

	const fileSize = isFile(imageSource)
		? (imageSource.size / 1024 / 1024).toFixed(1)
		: null;

	return (
		<Card
			className={cn(
				"group relative aspect-square cursor-move overflow-hidden transition-all duration-200",
				isDragging && "scale-95 opacity-50",
				isDragOver && "ring-2 ring-primary ring-offset-2",
				"hover:shadow-md",
			)}
			draggable
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			onDragStart={onDragStart}
			onDrop={onDrop}
		>
			{/* Image */}
			<div className="absolute inset-0">
				<Image
					alt={`Upload ${index + 1}`} // Use the new prop
					className="object-cover"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					src={imagePreviewUrl || "/placeholder.svg"}
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

				{/* Drag Handle */}
				<div className="absolute top-2 left-2 opacity-0 transition-opacity group-hover:opacity-100">
					<div className="rounded bg-background/80 p-1 backdrop-blur-sm">
						<GripVertical className="h-4 w-4 text-muted-foreground" />
					</div>
				</div>

				{/* Remove Button */}
				<Button
					className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					size="sm"
					variant="destructive"
				>
					<X className="h-3 w-3" />
				</Button>

				{/* Main Badge */}
				{isMain && (
					<Badge className="absolute bottom-2 left-2 font-medium text-xs">
						Main
					</Badge>
				)}

				{/* Image Info (conditionally rendered for File objects) */}
				{fileSize && (
					<div className="absolute right-2 bottom-2 opacity-0 transition-opacity group-hover:opacity-100">
						<div className="rounded bg-background/80 px-2 py-1 backdrop-blur-sm">
							<p className="text-muted-foreground text-xs">{fileSize}MB</p>
						</div>
					</div>
				)}
			</div>
		</Card>
	);
}
