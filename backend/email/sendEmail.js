import { FRONTEND_URL } from "../config/env.js";
import { nodemailerTransporter, sender } from "../config/nodemailer.js";
import { devLog } from "../utils/logs.js";
import {
    PASSWORD_RESET_EMAIL,
    PASSWORD_RESET_SUCCESS_EMAIL,
    VERIFY_ACCOUNT_EMAIL,
    WELCOME_EMAIL,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (user) => {
    try {
        const verificationCode = user?.verification?.code;

        if (!verificationCode) throw new Error("Verification code is missing.");

        await nodemailerTransporter.sendMail({
            from: sender,
            to: user.email,
            subject: VERIFY_ACCOUNT_EMAIL.subject,
            html: VERIFY_ACCOUNT_EMAIL.html
                .replace("{verificationCode}", verificationCode)
                .replace("{userName}", user.name),
        });

        devLog("Verification email sent to: ", user.email);
    } catch (error) {
        devLog("Failed to send verification email:", error.message);
        throw error;
    }
};
export const sendWelcomeEmail = async (user) => {
    try {
        await nodemailerTransporter.sendMail({
            from: sender,
            to: user.email,
            subject: WELCOME_EMAIL.subject,
            html: WELCOME_EMAIL.html.replace("{userName}", user.name),
        });

        devLog("Welcome email sent to: ", user.email);
    } catch (error) {
        devLog("Failed to send welcome email:", error.message);
        throw error;
    }
};

export const sendResetPasswordEmail = async (user, token) => {
    try {
        await nodemailerTransporter.sendMail({
            from: sender,
            to: user.email,
            subject: PASSWORD_RESET_EMAIL.subject,
            html: PASSWORD_RESET_EMAIL.html
                .replace("{userName}", user.name)
                .replace(
                    "{resetLink}",
                    FRONTEND_URL && `${FRONTEND_URL}/reset-password/${token}`
                ),
        });

        devLog("Reset password email sent to: ", user.email);
    } catch (error) {
        devLog("Failed to send Reset password email:", error.message);
        throw error;
    }
};

export const sendResetPasswordSuccessEmail = async (user) => {
    try {
        await nodemailerTransporter.sendMail({
            from: sender,
            to: user.email,
            subject: PASSWORD_RESET_SUCCESS_EMAIL.subject,
            html: PASSWORD_RESET_SUCCESS_EMAIL.html.replace(
                "{userName}",
                user.name
            ),
        });

        devLog("Reset password success email sent to: ", user.email);
    } catch (error) {
        devLog("Failed to send Reset password success email:", error.message);
        throw error;
    }
};
