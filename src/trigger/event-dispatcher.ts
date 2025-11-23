import { task, logger } from "@trigger.dev/sdk/v3";
import { db } from "@/db/db";
import {
	IntegrationInstallationTable,
	IntegrationDefinitionTable,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const eventDispatcherTask = task({
	id: "event-dispatcher",
	retry: {
		maxAttempts: 3,
		minTimeoutInMs: 1000,
		maxTimeoutInMs: 10_000,
	},
	run: async (payload: {
		eventName: string;
		storeId: string;
		payload: unknown;
		timestamp: Date;
	}) => {
		logger.info("Dispatching event", {
			event: payload.eventName,
			store: payload.storeId,
		});

		// Query all enabled installations for this store that subscribe to this event
		const installations = await db
			.select({
				installation: IntegrationInstallationTable,
				definition: IntegrationDefinitionTable,
			})
			.from(IntegrationInstallationTable)
			.innerJoin(
				IntegrationDefinitionTable,
				eq(
					IntegrationInstallationTable.integration_id,
					IntegrationDefinitionTable.id
				)
			)
			.where(
				and(
					eq(IntegrationInstallationTable.store_id, payload.storeId),
					eq(IntegrationInstallationTable.is_enabled, true)
				)
			);

		// Filter by subscribed events
		const matchedInstallations = installations.filter((row) =>
			row.definition.subscribed_events.includes(payload.eventName)
		);

		logger.info(
			`Found ${matchedInstallations.length} integrations listening to ${payload.eventName}`
		);

		// Dispatch to each integration
		const results = [];
		for (const { installation, definition } of matchedInstallations) {
			try {
				const response = await fetch(definition.target_endpoint_url, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						event: payload.eventName,
						storeId: payload.storeId,
						payload: payload.payload,
						timestamp: payload.timestamp,
						config: installation.config, // User's integration config (API keys, etc.)
					}),
				});

				if (!response.ok) {
					logger.error(`Failed to dispatch to ${definition.name}`, {
						status: response.status,
						statusText: response.statusText,
					});
					results.push({ integration: definition.name, success: false });
				} else {
					logger.info(`Successfully dispatched to ${definition.name}`);
					results.push({ integration: definition.name, success: true });
				}
			} catch (error) {
				logger.error(`Error dispatching to ${definition.name}`, { error });
				results.push({ integration: definition.name, success: false, error });
			}
		}

		return { dispatched: matchedInstallations.length, results };
	},
});
