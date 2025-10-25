import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const dashboardQueryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			onError: () => toast.error("Unknown error"),
		},
	},
});
