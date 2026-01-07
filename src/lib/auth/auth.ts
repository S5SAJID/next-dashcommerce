import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { sendAuthPasswordResetFunction } from "../email/password-reset";
import { sendAuthEmailVerification } from "../email/email-verification";
import { sendWelcomeEmail } from "../email/welcome-email";

export const auth = betterAuth({
	user: {
		additionalFields: {
			storeId: {
				type: "string",
				required: false,
			},
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
	}),
	session: {
		cookieCache: {
			enabled: true,
			maxAge: process.env.NODE_ENV === "development" ? 60 : 60 * 60, // 1 hour
		},
	},
	rateLimit: {
		storage: "database", //TODO: manage reddis for this
	},
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await sendAuthPasswordResetFunction({ user, url });
		},
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url }) => {
			await sendAuthEmailVerification({ user, url });
		},
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
		},
	},
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.startsWith("/sign-up")) {
				const user = ctx.context.newSession?.user ?? {
					name: ctx.body.name,
					email: ctx.body.email,
				};
				if (user != null) {
					await sendWelcomeEmail({ user });
				}
			}
		}),
	},
});
