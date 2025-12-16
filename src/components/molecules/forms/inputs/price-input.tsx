"use client";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from "@/components/ui/input-group";
import { NumberInput } from "@/components/ui/number-input";
import { useDashboardStoreInfo } from "@/lib/context/dashboard/store-context-provider";
import { CURRENCY_INFO } from "@/lib/currency";
import { ControllerRenderProps } from "react-hook-form";

export default function PriceInput({
	field,
	placeholder,
}: {
	field: ControllerRenderProps<any>;
	placeholder?: string;
}) {
	const { store } = useDashboardStoreInfo();
	if (!store) return null;

	return (
		<InputGroup>
			<InputGroupAddon>
				<InputGroupText>{CURRENCY_INFO[store.currency].symbol}</InputGroupText>
			</InputGroupAddon>
			<NumberInput placeholder={placeholder} {...field} inGroup />
		</InputGroup>
	);
}
