import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from "@/components/ui/input-group";
import { NumberInput } from "@/components/ui/number-input";
import { ControllerRenderProps } from "react-hook-form";

export default function PriceInput({
	field,
	placeholder,
	currencyCode = "$",
}: {
	field: ControllerRenderProps<any>;
	placeholder?: string;
	currencyCode?: string;
}) {
	return (
		<InputGroup>
			<InputGroupAddon>
				<InputGroupText>{currencyCode}</InputGroupText>
			</InputGroupAddon>
			<NumberInput placeholder={placeholder} {...field} inGroup />
		</InputGroup>
	);
}
