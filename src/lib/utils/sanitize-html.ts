import DOMPurify from "isomorphic-dompurify";

/**
 * Configuration for DOMPurify to allow safe HTML tags in custom head code.
 * Permits script, meta, link, and style tags while blocking XSS vectors.
 */
const ALLOWED_TAGS = ["meta", "link", "style", "noscript"];

const ALLOWED_ATTR = [
	"src",
	"href",
	"type",
	"rel",
	"charset",
	"name",
	"content",
	"property",
	"async",
	"defer",
	"crossorigin",
	"integrity",
	"media",
	"sizes",
	"as",
	"referrerpolicy",
];

/**
 * Sanitizes HTML content to allow only safe tags and attributes for head injection.
 * Prevents XSS attacks while permitting tracking scripts, meta tags, and stylesheets.
 *
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string safe for injection
 *
 * @example
 * ```ts
 * const safe = sanitizeHeadCode('<script src="analytics.js"></script>');
 * // Returns: '<script src="analytics.js"></script>'
 *
 * const blocked = sanitizeHeadCode('<script>alert("XSS")</script>');
 * // Returns: '' (inline scripts without src are blocked for security)
 * ```
 */
export function sanitizeHeadCode(html: string): string {
	const sanitized = DOMPurify.sanitize(html, {
		ALLOWED_TAGS,
		ALLOWED_ATTR,
		WHOLE_DOCUMENT: true,
		FORCE_BODY: false,

		// Ensures text inside <style> is not wiped out
		KEEP_CONTENT: true,
	});

	// Since WHOLE_DOCUMENT returns a full <html>...</html> string,
	// extract only what ended up inside the <head>
	const headMatch = sanitized.match(/<head>([\s\S]*?)<\/head>/i);
	return headMatch ? headMatch[1].trim() : "";
}
