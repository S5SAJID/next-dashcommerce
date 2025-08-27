"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

import { Upload } from "lucide-react"
import { ImageUploadItem } from "@/components/molecules/image-upload-item"
import { toast } from "sonner"

export interface ImageUploaderProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
  maxFileSize?: number // in bytes
  acceptedTypes?: string[]
  className?: string
}

export function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
  className,
}: ImageUploaderProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `File type ${file.type} is not supported. Please use ${acceptedTypes.join(", ")}.`
      }
      if (file.size > maxFileSize) {
        return `File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(1)}MB.`
      }
      return null
    },
    [acceptedTypes, maxFileSize],
  )

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return

      const newFiles: File[] = []
      const errors: string[] = []

      Array.from(selectedFiles).forEach((file) => {
        const error = validateFile(file)
        if (error) {
          errors.push(`${file.name}: ${error}`)
        } else if (images.length + newFiles.length < maxImages) {
          newFiles.push(file)
        } else {
          errors.push(`Maximum ${maxImages} images allowed.`)
        }
      })

      if (errors.length > 0) {
        toast("Upload Error", {
          description: errors.join(" "),
        })
      }

      if (newFiles.length > 0) {
        onImagesChange([...images, ...newFiles])
        toast("Images Added", {
          description: `${newFiles.length} image(s) uploaded successfully.`,
        })
      }
    },
    [images, maxImages, onImagesChange, validateFile],
  )

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    setDragOverIndex(null)

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const newImages = [...images]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)

    onImagesChange(newImages)
    setDraggedIndex(null)

    toast("Images reordered", {
      description: "Image order updated successfully.",
    })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
    toast("Image Removed", {
      description: "Image removed successfully.",
    })
  }

  const handleAddImageClick = () => {
    fileInputRef.current?.click()
  }

  const canAddMore = images.length < maxImages

  return (
    <div className={cn("space-y-4", className)}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ImageUploadItem
            key={`${image.name}-${index}`}
            image={image}
            index={index}
            isMain={index === 0}
            isDragging={draggedIndex === index}
            isDragOver={dragOverIndex === index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onRemove={() => handleRemoveImage(index)}
          />
        ))}

        {canAddMore && (
          <Card
            className={cn(
              "aspect-square border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer group",
              "flex flex-col items-center justify-center gap-2 p-4",
            )}
            onClick={handleAddImageClick}
          >
            <Upload className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Add Image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {images.length}/{maxImages}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
