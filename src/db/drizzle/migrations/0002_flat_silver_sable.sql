CREATE TABLE "integration_definitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"logo_url" varchar(500),
	"target_endpoint_url" varchar(500) NOT NULL,
	"subscribed_events" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"config_schema" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_global" boolean DEFAULT true NOT NULL,
	"created_by_store_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "integration_definitions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "integration_installations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"store_id" uuid NOT NULL,
	"integration_id" uuid NOT NULL,
	"is_enabled" boolean DEFAULT true NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "store_integration_unique" UNIQUE("store_id","integration_id")
);
--> statement-breakpoint
ALTER TABLE "integration_definitions" ADD CONSTRAINT "integration_definitions_created_by_store_id_stores_id_fk" FOREIGN KEY ("created_by_store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integration_installations" ADD CONSTRAINT "integration_installations_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "integration_installations" ADD CONSTRAINT "integration_installations_integration_id_integration_definitions_id_fk" FOREIGN KEY ("integration_id") REFERENCES "public"."integration_definitions"("id") ON DELETE no action ON UPDATE no action;