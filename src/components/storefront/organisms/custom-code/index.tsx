import { parseHeadCode } from "@/lib/utils/parse-head-code";

export default function CustomCode({
	customHeadCode,
}: {
	customHeadCode?: string;
}) {
	// Parse custom head code if present
	if (!customHeadCode) return null;

	try {
		const customHead = parseHeadCode(customHeadCode);

		return (
			<>
				{/* Inject custom meta and link tags */}
				{customHead?.metas.map((meta, idx) => (
					<meta key={`custom-meta-${idx}`} {...meta} />
				))}
				{customHead?.links.map((link, idx) => (
					<link key={`custom-link-${idx}`} {...link} />
				))}

				{/* Inject custom scripts using Next.js Script component */}
				{/* {customHead?.scripts.map((script, idx) => {
        if (script.src) {
          // External script with src attribute
          return (
            <Script
              key={`custom-script-${idx}`}
              src={script.src}
              strategy="afterInteractive"
              {...(script.async && { async: true })}
              {...(script.defer && { defer: true })}
              {...(script.type && { type: script.type })}
            />
          );
        }
        // Note: Inline scripts are intentionally not supported for security
        return null;
      })} */}

				{/* Inject custom styles */}
				{customHead?.styles && customHead.styles.length > 0 && (
					<style
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized by DOMPurify
						dangerouslySetInnerHTML={{
							__html: customHead.styles.join("\n"),
						}}
					/>
				)}
			</>
		);
	} catch (error) {
		console.error("Custom code parsing failed:", error);
		return null;
	}
}
