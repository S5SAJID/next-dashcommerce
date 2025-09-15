import {defineConfig} from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  },
  schema: "./src/db/schema/index.ts",
  out: "./src/db/drizzle/migrations/",
  strict: true,
  verbose: true,
})