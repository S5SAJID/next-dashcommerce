import { tasks } from "@trigger.dev/sdk/v3";
import type { eventDispatcherTask } from "@/trigger/event-dispatcher";

export type EventPayload = {
	eventName: string;
	storeId: string;
	payload: unknown;
	timestamp: Date;
};

/**
 * Publish an event to the integration system
 * This will trigger all integrations subscribed to this event
 */
export async function publishEvent(
	eventName: string,
	storeId: string,
	payload: unknown,
) {
	await tasks.trigger<typeof eventDispatcherTask>("event-dispatcher", {
		eventName,
		storeId,
		payload,
		timestamp: new Date(),
	});
}
