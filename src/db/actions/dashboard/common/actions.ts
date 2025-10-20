"use server";
import { db } from "@/db/db";
import { StoreTable } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export async function checkDashboardSubdomainAvailability(subdomain: string): Promise<{ isAvailable: boolean }> {
  // 1. Basic validation
  if (!subdomain || subdomain.length < 3) {
    return { isAvailable: false }; // Treat short/empty as unavailable or invalid
  }

  // 2. Query the database using Drizzle ORM
  const existingDomain = await db.query.StoreTable.findFirst({
    where: eq(StoreTable.domain, subdomain.toLowerCase()),
    columns: { id: true }, // Only fetch the ID for efficiency
  });

  // 3. Return the result
  return { isAvailable: !existingDomain };
}