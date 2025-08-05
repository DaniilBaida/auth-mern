import {
    sendResetPasswordEmail,
    sendResetPasswordSuccessEmail,
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
import { devLog } from "../utils/logs.js";

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw createError(
                "All fields (name, email, password) are required",
                400
            );
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) throw createError("Email is already in use", 409);

        const createdUser = await User.create({
            name,
            email,
            password: await hashPassword(password),
            verification: generateVerificationCode(),
        });

        const token = generateAccessToken(createdUser._id);
        setCookie(res, "token", token);

        await sendVerificationEmail(createdUser);
        devLog("Verification code:", createdUser.verification.code);

        res.status(201).json({
            success: true,
            message: "User registered. Verification email sent.",
            data: {
                id: createdUser._id,
                name,
                email,
            },
        });
    } catch (error) {
        console.log(`[Auth.register] ${error.message}`);
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            throw createError("Email and password are required", 400);

        const user = await User.findOne({ email });
        if (!user) throw createError("Invalid email or password", 401);

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid)
            throw createError("Invalid email or password", 401);

        const token = generateAccessToken(user._id);
        setCookie(res, "token", token);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email,
                isVerified: user.isVerified,
                lastLogin: user.lastLogin,
            },
        });
    } catch (error) {
        console.log(`[Auth.login] ${error.message}`);
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "User logged out",
        });
    } catch (error) {
        console.log(`[Auth.logout] ${error.message}`);
        next(error);
    }
};

export const sendEmailVerificationLink = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) throw createError("Email is required", 400);

        const user = await User.findOne({ email });
        if (!user) throw createError("No user found with this email", 404);

        if (user.isVerified) throw createError("User is already verified", 400);

        user.verification = generateVerificationCode();
        await user.save();

        await sendVerificationEmail(user);
        devLog("Verification code:", user.verification.code);

        res.status(200).json({
            success: true,
            message: "Verification email sent",
        });
    } catch (error) {
        console.log(`[Auth.sendEmailVerificationLink] ${error.message}`);
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    const { code } = req.body;
    try {
        if (!code) throw createError("Verification code is required", 400);

        const user = await User.findOne({
            "verification.code": code,
            "verification.expiresAt": { $gt: new Date() },
        });

        if (!user)
            throw createError("Invalid or expired verification code", 400);

        user.isVerified = true;
        user.verification = undefined;
        await user.save();

        await sendWelcomeEmail(user);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.log(`[Auth.verifyEmail] ${error.message}`);
        next(error);
    }
};

export const sendPasswordResetLink = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) throw createError("Email is required", 400);

        const user = await User.findOne({ email });
        if (!user) throw createError("No user found with this email", 404);

        const token = generateResetToken(user._id);

        await sendResetPasswordEmail(user, token);

        user.resetPassword = {
            token: hashToken(token),
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        };
        await user.save();

        devLog("Password reset token:", token);

        res.status(200).json({
            success: true,
            message: "Password reset email sent",
        });
    } catch (error) {
        console.log(`[Auth.sendPasswordResetLink] ${error.message}`);
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        if (!token) throw createError("Reset token is required", 400);
        if (!newPassword) throw createError("New password is required", 400);

        const user = await User.findOne({
            "resetPassword.token": hashToken(token),
            "resetPassword.expiresAt": { $gt: new Date() },
        });

        if (!user) throw createError("Invalid or expired reset token", 400);

        user.password = await hashPassword(newPassword);
        user.resetPassword = undefined;
        await user.save();

        await sendResetPasswordSuccessEmail(user);

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log(`[Auth.resetPassword] ${error.message}`);
        next(error);
    }
};
