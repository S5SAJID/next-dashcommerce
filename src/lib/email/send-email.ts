import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD,
  },
});

type sendAuthEmailProps = {
  to: string
  subject: string
  html: string
  text: string
}

export function sendAuthEmail({ to, subject, html, text }: sendAuthEmailProps) {
  return transporter.sendMail({
    to,
    subject,
    html,
    text
  })
}