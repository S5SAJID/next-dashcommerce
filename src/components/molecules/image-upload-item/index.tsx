"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, GripVertical } from "lucide-react"
import Image from "next/image"

interface ImageUploadItemProps {
  image: File
  index: number
  isMain: boolean
  isDragging: boolean
  isDragOver: boolean
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  onRemove: () => void
}

export function ImageUploadItem({
  image,
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
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    const url = URL.createObjectURL(image)
    setImageUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  return (
    <Card
      className={cn(
        "relative aspect-square overflow-hidden group cursor-move transition-all duration-200",
        isDragging && "opacity-50 scale-95",
        isDragOver && "ring-2 ring-primary ring-offset-2",
        "hover:shadow-md",
      )}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={`Upload ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

        {/* Drag Handle */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-background/80 backdrop-blur-sm rounded p-1">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Remove Button */}
        <Button
          size="sm"
          variant="destructive"
          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <X className="h-3 w-3" />
        </Button>

        {/* Main Badge */}
        {isMain && (
          <Badge className="absolute bottom-2 left-2 text-xs font-medium">
            Main
          </Badge>
        )}

        {/* Image Info */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1">
            <p className="text-xs text-muted-foreground">{(image.size / 1024 / 1024).toFixed(1)}MB</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
