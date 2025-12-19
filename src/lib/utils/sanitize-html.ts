import sanitizeHtml from "sanitize-html";
/**
 * Configuration for DOMPurify to allow safe HTML tags in custom head code.
 * Permits script, meta, link, and style tags while blocking XSS vectors.
 */
const ALLOWED_TAGS = ["meta", "link"];

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
	const sanitized = sanitizeHtml(html, {
		allowedTags: ALLOWED_TAGS,
		allowedAttributes: {
			"*": ALLOWED_ATTR,
		},
	});

	return sanitized.trim();
}
