import {
    sendResetPasswordEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
} from "../email/sendEmail.js";
import { User } from "../models/User.js";
import { createError } from "../utils/createError.js";
import {
    generateAccessToken,
    generateResetToken,
    generateVerificationCode,
} from "../utils/auth.js";
import { comparePassword, hashPassword, hashToken } from "../utils/hash.js";
import { setCookie } from "../utils/setCookie.js";
import { NODE_ENV } from "../config/env.js";

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw createError("Missing required fields", 400);
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) throw createError("User already exists", 409);

        const createdUser = await User.create({
            name,
            email,
            password: await hashPassword(password),
            verification: generateVerificationCode(),
        });

        const token = generateAccessToken(createdUser._id);
        setCookie(res, "token", token);

        sendVerificationEmail(createdUser);

        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: {
                id: createdUser._id,
                name,
                email,
            },
        });
    } catch (error) {
        console.log(`[Auth.register] Failed to register: ${error.message}`);
        next(error);
    }
};
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            throw createError("All fields are required", 400);

        const foundUser = await User.findOne({ email });
        if (!foundUser) throw createError("Invalid credentials", 401);

        const isPasswordValid = await comparePassword(
            password,
            foundUser.password
        );

        if (!isPasswordValid) throw createError("Invalid credentials", 401);

        let token = generateAccessToken(foundUser._id);
        setCookie(res, "token", token);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                id: foundUser._id,
                name: foundUser.name,
                email,
                isVerified: foundUser.isVerified,
                lastLogin: foundUser.lastLogin,
            },
        });
    } catch (error) {
        console.log(`[Auth.login] Failed to login: ${error.message}`);
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Token cookie cleared successfully",
        });
    } catch (error) {
        console.log(`[Auth.logout] Failed to logout: ${error.message}`);
        next(error);
    }
};

export const sendEmailVerificationLink = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) throw createError("Email is required", 400);

        const user = await User.findOne({ email });
        if (!user) throw createError("User not found", 404);

        if (user.isVerified === true)
            throw createError("User is verified already", 400);
        user.verification = generateVerificationCode();
        user.save();

        sendVerificationEmail(user);
        if (NODE_ENV === "development")
            console.log(`Verification code: ${user.verification.code}`);

        res.status(200).json({
            success: true,
            message: "Verification email sent successfully",
        });
    } catch (error) {
        console.log(
            `[Auth.sendEmailVerificationLink] Failed to send verification link: ${error.message}`
        );
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    const { code } = req.body;
    try {
        if (!code) throw createError("Verification code is required", 400);

        const userToVerify = await User.findOne({
            "verification.code": code,
            "verification.expiresAt": { $gt: Date.now() },
        });

        if (!userToVerify) throw createError("Verification code is invalid");

        userToVerify.isVerified = true;
        userToVerify.verification = undefined;
        await userToVerify.save();

        await sendWelcomeEmail(userToVerify);

        res.status(200).json({
            success: true,
            message: "User verified successfully",
        });
    } catch (error) {
        console.log(
            `[Auth.verifyEmail] Failed to verify email: ${error.message}`
        );
        next(error);
    }
};

export const sendPasswordResetLink = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) throw createError("Email is required", 400);

        const user = await User.findOne({ email });
        if (!user) throw createError("User not found", 404);

        const token = generateResetToken(user._id);
        await sendResetPasswordEmail(user, token);

        user.resetPassword = {
            token: hashToken(token),
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        };
        await user.save();

        if (NODE_ENV === "development") console.log(`Reset token: ${token}`);

        res.status(200).json({
            success: true,
            message: "Password reset request sent successfully",
        });
    } catch (error) {
        console.log(
            `[Auth.requestResetPassword] Failed to send password reset link: ${error.message}`
        );
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        if (!token) throw createError("Token is required");
        if (!newPassword) throw createError("New Password is required");

        const user = await User.findOne({
            "resetPassword.token": hashToken(token),
            "resetPassword.expiresAt": { $gt: new Date() },
        });
        if (!user) throw createError("The token is invalid", 400);

        user.password = await hashPassword(newPassword);
        user.resetPassword = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
        });
    } catch (error) {
        console.log(
            `[Auth.resetPassword] Failed to reset password: ${error.message}`
        );
        next(error);
    }
};
