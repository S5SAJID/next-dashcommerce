import { cache } from "react";
import { sanitizeHeadCode } from "./sanitize-html";
import { parse } from "node-html-parser";

/**
 * Parses and extracts individual HTML elements from sanitized head code.
 * Separates scripts, meta tags, link tags, and styles for proper rendering.
 * Server-side compatible using regex patterns.
 *
 * @param headCode - Sanitized HTML string from store settings
 * @returns Object containing separated arrays of different tag types
 */
export const parseHeadCode = cache((headCode: string) => {
	const sanitized = sanitizeHeadCode(headCode);
	const root = parse(sanitized);

	return {
		metas: root.querySelectorAll("meta").map((el) => el.attributes),
		links: root.querySelectorAll("link").map((el) => el.attributes),
		styles: root.querySelectorAll("style").map((el) => el.innerHTML),
	};
});
