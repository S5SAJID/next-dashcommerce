"use client";

import { Usable, use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	createApiKey,
	listApiKeys,
	revokeApiKey,
} from "@/db/actions/dashboard/settings/api-keys/actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Copy, Plus, Trash2, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AVAILABLE_PERMISSIONS } from "@/db/actions/dashboard/settings/api-keys/const";
import type { SafeActionResult } from "next-safe-action";

type ApiKey = {
	id: string;
	name: string;
	key_preview: string;
	permissions: string[];
	is_active: boolean;
	last_used_at: Date | null;
	created_at: Date;
};

type listKeysPromiseType = Promise<
	SafeActionResult<
		string,
		undefined,
		| {
				formErrors: string[];
				fieldErrors: {};
		  }
		| undefined,
		ApiKey[],
		object
	>
>;

export function ApiKeysManager({
	listKeysPromise,
}: {
	listKeysPromise: listKeysPromiseType;
}) {
	const initialKeys = use(listKeysPromise);

	const [keys, setKeys] = useState<ApiKey[]>(initialKeys.data ?? []);
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [newKeyName, setNewKeyName] = useState("");
	const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
	const [generatedKey, setGeneratedKey] = useState<string | null>(null);

	const { execute: executeCreate, isExecuting: isCreating } = useAction(
		createApiKey,
		{
			onSuccess: async ({ data }) => {
				if (data) {
					setGeneratedKey(data.apiKey);
					toast.success("API key created successfully");
					// Refresh list
					const result = await listApiKeys();
					if (result?.data) {
						setKeys(result.data);
					}
				}
			},
			onError: ({ error }) => {
				toast.error(error.serverError || "Failed to create API key");
			},
		},
	);

	const { execute: executeRevoke } = useAction(revokeApiKey, {
		onSuccess: async () => {
			toast.success("API key revoked successfully");
			// Refresh list
			const result = await listApiKeys();
			if (result?.data) {
				setKeys(result.data);
			}
		},
		onError: ({ error }) => {
			toast.error(error.serverError || "Failed to revoke API key");
		},
	});

	const handleCreate = () => {
		if (!newKeyName.trim()) {
			toast.error("Please enter a name for the API key");
			return;
		}
		if (selectedPermissions.length === 0) {
			toast.error("Please select at least one permission");
			return;
		}

		executeCreate({
			name: newKeyName,
			permissions:
				selectedPermissions as (typeof AVAILABLE_PERMISSIONS)[number][],
		});
	};

	const handleCopyKey = () => {
		if (generatedKey) {
			navigator.clipboard.writeText(generatedKey);
			toast.success("API key copied to clipboard");
		}
	};

	const handleCloseGeneratedDialog = () => {
		setGeneratedKey(null);
		setIsCreateDialogOpen(false);
		setNewKeyName("");
		setSelectedPermissions([]);
	};

	const handleRevoke = (id: string) => {
		if (confirm("Are you sure you want to revoke this API key?")) {
			executeRevoke({ id });
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h4 className="font-medium">Your API Keys</h4>
					<p className="text-sm text-muted-foreground">
						Create and manage keys for programmatic access
					</p>
				</div>
				<Button
					disabled={isCreating}
					onClick={() => setIsCreateDialogOpen(true)}
					size="sm"
				>
					<Plus className="mr-2 h-4 w-4" />
					Create API Key
				</Button>
			</div>

			{keys.length === 0 ? (
				<div className="text-center py-12 border rounded-lg border-dashed">
					<Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
					<p className="text-muted-foreground">No API keys yet</p>
					<p className="text-sm text-muted-foreground mt-2">
						Create an API key to enable programmatic access
					</p>
				</div>
			) : (
				<div className="space-y-3">
					{keys.map((key, index) => (
						<div key={key.id}>
							<div className="flex items-start gap-4 py-3 border px-3 rounded">
								{/* Icon */}
								<div className="flex-shrink-0">
									<div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
										<Key className="h-6 w-6 text-muted-foreground" />
									</div>
								</div>

								{/* Content */}
								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 mb-1">
												<h4 className="font-medium text-sm">{key.name}</h4>
												{!key.is_active && (
													<Badge className="text-xs" variant="destructive">
														Revoked
													</Badge>
												)}
											</div>
											<p className="text-sm text-muted-foreground font-mono mb-2">
												{key.key_preview}
											</p>
											<div className="flex flex-wrap gap-1 mb-2">
												{key.permissions.map((permission) => (
													<Badge
														className="text-xs"
														key={permission}
														variant="outline"
													>
														{permission}
													</Badge>
												))}
											</div>
											<p className="text-xs text-muted-foreground">
												{key.is_active ? (
													<>
														Last used:{" "}
														{key.last_used_at
															? new Date(key.last_used_at).toLocaleDateString()
															: "Never"}
													</>
												) : (
													"This key has been revoked and can no longer be used"
												)}
											</p>
										</div>

										{/* Actions */}
										<div className="flex items-center gap-2 flex-shrink-0">
											<Button
												disabled={!key.is_active}
												onClick={() => handleRevoke(key.id)}
												size="sm"
												variant="ghost"
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</div>
									</div>
								</div>
							</div>
							{index < keys.length - 1 && <Separator className="mt-3" />}
						</div>
					))}
				</div>
			)}

			{/* Create Dialog */}
			<AlertDialog
				onOpenChange={setIsCreateDialogOpen}
				open={isCreateDialogOpen && !generatedKey}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Create API Key</AlertDialogTitle>
						<AlertDialogDescription>
							Give your API key a name and select permissions
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								onChange={(e) => setNewKeyName(e.target.value)}
								placeholder="e.g., Production, Shopify Integration"
								value={newKeyName}
							/>
						</div>
						<div>
							<Label>Permissions</Label>
							<div className="space-y-2 mt-2">
								{AVAILABLE_PERMISSIONS.map((permission) => (
									<div className="flex items-center space-x-2" key={permission}>
										<Checkbox
											checked={selectedPermissions.includes(permission)}
											id={permission}
											onCheckedChange={(checked) => {
												if (checked) {
													setSelectedPermissions([
														...selectedPermissions,
														permission,
													]);
												} else {
													setSelectedPermissions(
														selectedPermissions.filter((p) => p !== permission),
													);
												}
											}}
										/>
										<label
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											htmlFor={permission}
										>
											{permission}
										</label>
									</div>
								))}
							</div>
						</div>
					</div>
					<AlertDialogFooter>
						<Button
							onClick={() => setIsCreateDialogOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button disabled={isCreating} onClick={handleCreate}>
							{isCreating ? "Creating..." : "Create"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Generated Key Dialog */}
			<AlertDialog
				onOpenChange={handleCloseGeneratedDialog}
				open={!!generatedKey}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>API Key Created</AlertDialogTitle>
						<AlertDialogDescription className="text-yellow-600 dark:text-yellow-500">
							⚠️ Copy this key now. You won't be able to see it again!
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="space-y-4">
						<div>
							<Label>Your API Key</Label>
							<div className="flex gap-2 mt-2">
								<Input
									className="font-mono"
									readOnly
									value={generatedKey || ""}
								/>
								<Button onClick={handleCopyKey} size="icon" variant="outline">
									<Copy className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
					<AlertDialogFooter>
						<Button onClick={handleCloseGeneratedDialog}>Done</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
