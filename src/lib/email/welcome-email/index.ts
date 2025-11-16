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
		subject: "Welcome to S5ARC.!",
		text: `Welcome Aboard, ${user.name}!

We're thrilled to have you at S5ARC..  

Thanks,
S5ARC. © 2025`,
	});
}
