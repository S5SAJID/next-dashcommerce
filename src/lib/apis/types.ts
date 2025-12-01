import { OpenAPIV3_1 } from "openapi-types";

export type ApiMetadata = Partial<
		Pick<
			OpenAPIV3_1.OperationObject<{}>,
			| "tags"
			| "summary"
			| "description"
			| "externalDocs"
			| "parameters"
			| "callbacks"
			| "deprecated"
			| "security"
			| "servers"
		>
	>;