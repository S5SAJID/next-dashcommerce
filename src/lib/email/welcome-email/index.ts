import { sendAuthEmail } from "../send-email";
import { WelcomeEmailTemplate } from "./template";

type props = {
	user: {
		email: string;
		name: string;
	};
};

export function sendWelcomeEmail({ user }: props) {
	return sendAuthEmail({
		to: user.email,
		html: WelcomeEmailTemplate({ user }),
		subject: "Welcome to Custom Eco!",
		text: `Welcome Aboard, ${user.name}!

We're thrilled to have you at Custom Eco.  

Thanks,
Custom Eco © 2025`,
	});
}
