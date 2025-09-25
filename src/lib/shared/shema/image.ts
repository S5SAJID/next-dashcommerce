import { z } from 'zod';

// Global constants for configuration
export const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Reusable schema for a single image file
export const imageFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `Max image size is 5MB.`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png, and .webp formats are supported.',
  );

// Reusable schema for an array of image files
export const imageFilesSchema = z.array(imageFileSchema);

// Schema for a FileList (from a native file input)
// Transforms the FileList into an array of Files for validation
// export const imageFileListSchema = z
//   .instanceof(FileList)
//   .transform((fileList) => Array.from(fileList))
//   .pipe(imageFilesSchema);
