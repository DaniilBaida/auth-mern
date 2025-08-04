import { mailtrapClient, sender } from "../config/mailtrap.js";
import { VERIFY_ACCOUNT_EMAIL, WELCOME_EMAIL } from "./emailTemplates.js";

export const sendVerificationEmail = async (user) => {
    try {
        const verificationCode = user?.verification?.code;

        if (!verificationCode) throw new Error("Verification code is missing.");

        await mailtrapClient.send({
            from: sender,
            to: [{ email: user.email }],
            subject: VERIFY_ACCOUNT_EMAIL.subject,
            html: VERIFY_ACCOUNT_EMAIL.html
                .replace("{verificationCode}", verificationCode)
                .replace("{userName}", user.name),
            category: "email verification",
        });

        console.log("Verification email sent to: ", user.email);
    } catch (error) {
        console.error("Failed to send verification email:", error.message);
        throw error;
    }
};
export const sendWelcomeEmail = async (user) => {
    try {
        await mailtrapClient.send({
            from: sender,
            to: [{ email: user.email }],
            subject: WELCOME_EMAIL.subject,
            html: WELCOME_EMAIL.html.replace("{userName}", user.name),
            category: "welcome email",
        });

        console.log("Welcome email sent to: ", user.email);
    } catch (error) {
        console.error("Failed to send welcome email:", error.message);
        throw error;
    }
};
