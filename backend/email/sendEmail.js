import { FRONTEND_URL } from "../config/env.js";
import { mailtrapClient, sender } from "../config/mailtrap.js";
import {
    PASSWORD_RESET_EMAIL,
    VERIFY_ACCOUNT_EMAIL,
    WELCOME_EMAIL,
} from "./emailTemplates.js";

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

export const sendResetPasswordEmail = async (user, token) => {
    try {
        await mailtrapClient.send({
            from: sender,
            to: [{ email: user.email }],
            subject: PASSWORD_RESET_EMAIL.subject,
            html: PASSWORD_RESET_EMAIL.html
                .replace("{userName}", user.name)
                .replace(
                    "{resetLink}",
                    FRONTEND_URL && `${FRONTEND_URL}/reset-password/${token}`
                ),
            category: "reset password email",
        });

        console.log("Reset password email sent to: ", user.email);
    } catch (error) {
        console.error("Failed to send Reset password email:", error.message);
        throw error;
    }
};
