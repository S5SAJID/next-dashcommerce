import { toast } from "sonner";

export function toastPromise<T>(
	promise: Promise<T>,
	messages: {
		loading?: string;
		success: string | ((data: T) => string);
		error: string | ((err: Error) => string);
	},
): Promise<T> {
	return new Promise((resolve, reject) => {
		toast.promise(promise, {
			loading: messages.loading || "Loading...",
			success: (data: T) => {
				const message =
					typeof messages.success === "function"
						? messages.success(data)
						: messages.success;
				resolve(data);
				return message;
			},
			error: (err: Error) => {
				const message =
					typeof messages.error === "function"
						? messages.error(err)
						: messages.error;
				reject(err);
				return message;
			},
		});
	});
}
