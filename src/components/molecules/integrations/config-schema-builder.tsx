"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { type ConfigSchemaField } from "@/db/schema/tables/integrations";

type Props = {
	value: ConfigSchemaField[];
	onChange: (value: ConfigSchemaField[]) => void;
};

export function ConfigSchemaBuilder({ value, onChange }: Props) {
	function addField() {
		onChange([
			...value,
			{
				name: "",
				label: "",
				type: "text",
				required: false,
			},
		]);
	}

	function removeField(index: number) {
		onChange(value.filter((_, i) => i !== index));
	}

	function updateField(index: number, updates: Partial<ConfigSchemaField>) {
		const newValue = [...value];
		newValue[index] = { ...newValue[index], ...updates };
		onChange(newValue);
	}

	return (
		<div className="space-y-3">
			{value.map((field, index) => (
				<div className="border rounded-lg p-4 space-y-3" key={index}>
					<div className="flex items-center justify-between">
						<h4 className="font-medium text-sm">Field {index + 1}</h4>
						<Button
							onClick={() => removeField(index)}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Field Name</Label>
							<Input
								onChange={(e) => updateField(index, { name: e.target.value })}
								placeholder="api_key"
								value={field.name}
							/>
						</div>

						<div className="space-y-1">
							<Label>Label</Label>
							<Input
								onChange={(e) => updateField(index, { label: e.target.value })}
								placeholder="API Key"
								value={field.label}
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Type</Label>
							<Select
								onValueChange={(value) =>
									updateField(index, {
										type: value as ConfigSchemaField["type"],
									})
								}
								value={field.type}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="text">Text</SelectItem>
									<SelectItem value="password">Password</SelectItem>
									<SelectItem value="email">Email</SelectItem>
									<SelectItem value="url">URL</SelectItem>
									<SelectItem value="number">Number</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex items-end pb-2">
							<div className="flex items-center space-x-2">
								<Checkbox
									checked={field.required}
									id={`required-${index}`}
									onCheckedChange={(checked: boolean | string) =>
										updateField(index, { required: checked as boolean })
									}
								/>
								<Label className="font-normal" htmlFor={`required-${index}`}>
									Required
								</Label>
							</div>
						</div>
					</div>

					<div className="space-y-1">
						<Label>Placeholder (Optional)</Label>
						<Input
							onChange={(e) =>
								updateField(index, { placeholder: e.target.value })
							}
							placeholder="Enter placeholder text"
							value={field.placeholder || ""}
						/>
					</div>

					<div className="space-y-1">
						<Label>Description (Optional)</Label>
						<Input
							onChange={(e) =>
								updateField(index, { description: e.target.value })
							}
							placeholder="Field description"
							value={field.description || ""}
						/>
					</div>
				</div>
			))}

			<Button
				className="w-full"
				onClick={addField}
				type="button"
				variant="outline"
			>
				<Plus className="h-4 w-4 mr-2" />
				Add Field
			</Button>
		</div>
	);
}
