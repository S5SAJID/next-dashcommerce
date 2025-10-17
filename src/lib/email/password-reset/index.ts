import { sendAuthEmail } from "../send-email"
import { AuthResetEmailTemplate } from "./template"

type props = {
  user: {
    email: string,
    name: string
  },
  url: string
}

export function sendAuthPasswordResetFunction({ user, url }: props) {
  return sendAuthEmail({
    to: user.email,
    html: AuthResetEmailTemplate({ user, url }),
    subject: "Reset Your Password | Custom Eco",
    text: `Hi ${user.name},\n\nSomeone requested a password reset for your account. If this was you, you can set a new password by clicking the the url: ${url}\n\n
If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your account password.\n
Custom Eco © 2025`,
  })
}
