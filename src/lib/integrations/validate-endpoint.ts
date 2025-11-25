export type ValidationResult = {
	isValid: boolean;
	errors: string[];
	warnings: string[];
	endpoint?: {
		isLive: boolean;
		isSecure: boolean;
		isCompatible: boolean;
		responseTime: number;
	};
};

/**
 * Validate an integration API endpoint
 * Checks HTTPS, availability, and compatibility
 */
export async function validateIntegrationEndpoint(
	url: string
): Promise<ValidationResult> {
	const errors: string[] = [];
	const warnings: string[] = [];

	// 1. Check HTTPS protocol
	if (!url.startsWith("https://")) {
		errors.push("Endpoint must use HTTPS for security");
	}

	url = url.replace(/^(https?:\/\/[^/]+).*$/, "$1");

	// 2. Check if URL is reachable (with timeout)
	let isLive = false;
	let responseTime = 0;
	try {
		const start = Date.now();
		const response = await fetch(url, {
			method: "HEAD",
			signal: AbortSignal.timeout(5000), // 5 second timeout
		});
		responseTime = Date.now() - start;
		isLive = response.ok;

		if (!isLive) {
			errors.push(`Endpoint returned status ${response.status}`);
		}
	} catch (error) {
		if (error instanceof Error && error.name === "TimeoutError") {
			errors.push("Endpoint validation timed out (>5s)");
		} else {
			errors.push("Could not reach endpoint");
		}
	}

	// 3. Call /validate endpoint to check compatibility
	let isCompatible = false;
	if (isLive) {
		try {
			const response = await fetch(`${url}/validate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					version: "1.0",
					requiredCapabilities: ["webhook", "eventSubscription"],
				}),
				signal: AbortSignal.timeout(10000),
			});

			if (response.ok) {
				const data = await response.json();
				// Expected response: { compatible: true, version: string, capabilities: string[] }
				if (data.compatible === true) {
					isCompatible = true;
				} else {
					errors.push("Endpoint reported incompatibility");
					if (data.reason) errors.push(data.reason);
				}
			} else {
				warnings.push(
					"Endpoint does not expose /validate - compatibility unknown"
				);
				isCompatible = true; // Allow creation with warning
			}
		} catch (error) {
			warnings.push(
				"Could not verify compatibility - /validate endpoint unavailable"
			);
			isCompatible = true; // Allow creation with warning
		}
	}

	const isValid = errors.length === 0 && isLive;

	return {
		isValid,
		errors,
		warnings,
		endpoint: isLive
			? {
					isLive,
					isSecure: url.startsWith("https://"),
					isCompatible,
					responseTime,
				}
			: undefined,
	};
}
