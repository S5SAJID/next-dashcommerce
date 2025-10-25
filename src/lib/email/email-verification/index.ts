import { sendAuthEmail } from "../send-email";
import { AuthEmailVerificationTemplate } from "./template";

type props = {
	user: {
		email: string;
		name: string;
	};
	url: string;
};

export function sendAuthEmailVerification({ user, url }: props) {
	return sendAuthEmail({
		to: user.email,
		html: AuthEmailVerificationTemplate({ user, url }),
		subject: "Confirm Your Email Address | Custom Eco",
		text: `Welcome to Custom Eco! To complete your registration and begin using your account, please verify your email address by clicking the url: ${url}\n\n
    If you can't click the button, please copy and paste the following link into your web browser.
    If you did not sign up for an account with [Your Company Name], you can safely ignore this email.
    Thanks
Custom Eco © 2025`,
	});
}
