import { Input } from "@/components/ui/input";
import type { ComponentProps } from "react";
import { InputGroupInput } from "./input-group";

export function NumberInput({
	onChange,
	value,
	inGroup = false,
	...props
}: Omit<ComponentProps<typeof Input>, "type" | "onChange" | "value"> & {
	onChange: (value: number | null) => void;
	value: undefined | null | number;
	inGroup?: boolean;
}) {
	if (inGroup)
		return (
			<InputGroupInput
				{...props}
				onChange={(e) => {
					const number = e.target.valueAsNumber;
					onChange(Number.isNaN(number) ? null : number);
				}}
				type="number"
				value={value ?? ""}
			/>
		);

	return (
		<Input
			{...props}
			onChange={(e) => {
				const number = e.target.valueAsNumber;
				onChange(Number.isNaN(number) ? null : number);
			}}
			type="number"
			value={value ?? ""}
		/>
	);
}
