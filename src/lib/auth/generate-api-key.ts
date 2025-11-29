import { randomBytes } from "node:crypto";

/**
 * Generate a secure API key with prefix
 * Format: sk_live_{32 random hex characters}
 */
export function generateApiKey(): string {
	const randomPart = randomBytes(16).toString("hex");
	return `sk_live_${randomPart}`;
}
