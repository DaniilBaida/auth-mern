import { mailtrapClient, sender } from "../config/mailtrap.js";
import { VERIFY_ACCOUNT_EMAIL } from "../email/emailTemplates.js";

export const sendVerificationEmail = async (user) => {
    try {
        const token = user?.verification?.token;

        if (!token) throw new Error("Verification token is missing.");

        await mailtrapClient.send({
            from: sender,
            to: [{ email: user.email }],
            subject: VERIFY_ACCOUNT_EMAIL.subject,
            html: VERIFY_ACCOUNT_EMAIL.html
                .replace("{verificationCode}", user.verification.token)
                .replace("{userName}", user.name),
            category: "email verification",
        });

        console.log("Verification email sent to: ", user.email);
    } catch (error) {
        console.error("Failed to send verification email:", error.message);
        throw error;
    }
};
