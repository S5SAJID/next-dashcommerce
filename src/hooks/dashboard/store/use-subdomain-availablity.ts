"use client";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { checkDashboardSubdomainAvailability } from "@/db/actions/dashboard/common/actions";

type SubdomainStatus =
	| "idle"
	| "checking"
	| "available"
	| "unavailable"
	| "error";

export function useSubdomainAvailability(
	subdomain: string,
	debounceTime = 500,
	defaultValue?: string
) {
	const debouncedSubdomain = useDebounce(subdomain, debounceTime);
	const [status, setStatus] = useState<SubdomainStatus>("idle");
	const [error, setError] = useState<string | null>(null);

	// Ref to track the latest request
	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		if (debouncedSubdomain.length < 3 || debouncedSubdomain === defaultValue) {
			setStatus("idle");
			return;
		}

		// Abort previous request if it's still running
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		const newAbortController = new AbortController();
		abortControllerRef.current = newAbortController;

		setStatus("checking");
		setError(null);

		checkDashboardSubdomainAvailability(debouncedSubdomain)
			.then(({ isAvailable }) => {
				if (newAbortController.signal.aborted) {
					return; // Ignore if aborted
				}
				if (isAvailable) {
					setStatus("available");
				} else {
					setStatus("unavailable");
				}
			})
			.catch((err) => {
				if (newAbortController.signal.aborted) {
					return; // Ignore if aborted
				}
				setStatus("error");
				setError("Failed to check subdomain availability.");
				console.error(err);
			});

		return () => {
			newAbortController.abort();
		};
	}, [debouncedSubdomain]);

	return { status, error };
}
