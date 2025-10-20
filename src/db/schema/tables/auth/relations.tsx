import { relations } from "drizzle-orm"
import {
  user,
  session,
  account,
  twoFactor,
  passkey,
  organization,
  member,
  invitation,
  StoreTable,
} from "@/db/schema"

// User Relations
export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  twoFactor: one(twoFactor, {
    fields: [user.id],
    references: [twoFactor.userId],
  }),
  store: one(StoreTable, {
    references: [StoreTable.id],
    fields: [user.storeId],
  }),
  passkeys: many(passkey),
  memberships: many(member),
  sentInvitations: many(invitation, {
    relationName: "inviter",
  }),
}))

// Session Relations
export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

// Account Relations
export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

// TwoFactor Relations
export const twoFactorRelations = relations(twoFactor, ({ one }) => ({
  user: one(user, {
    fields: [twoFactor.userId],
    references: [user.id],
  }),
}))

// Passkey Relations
export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, {
    fields: [passkey.userId],
    references: [user.id],
  }),
}))

// Organization Relations
export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  invitations: many(invitation),
}))

// Member Relations (Join Table)
export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
}))

// Invitation Relations
export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
  inviter: one(user, {
    fields: [invitation.inviterId],
    references: [user.id],
    relationName: "inviter",
  }),
}))

// Todo: The 'subscription' and 'verification' tables have no direct foreign keys
// in the provided schema, so they don't have explicit relations defined here.
// If 'subscription.referenceId' were to reference a user or organization,
// you would add a relation for it.