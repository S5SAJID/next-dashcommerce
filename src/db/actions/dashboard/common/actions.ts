"use server";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadDashboardFiles(files: File[]) {
  const uploadDir = path.resolve(process.cwd(), "public/uploads");

  const fileUrls = [];
  for (const file of files) {
    const filePath = path.join(uploadDir, file.name);
    const fileData = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileData);
    console.log(`Saved image: ${file.name} at ${filePath}`);
    fileUrls.push("/uploads/"+file.name)
  }

  return fileUrls
}