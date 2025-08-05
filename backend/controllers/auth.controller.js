import { sendVerificationEmail, sendWelcomeEmail } from "../email/sendEmail.js";
import { User } from "../models/User.js";
import { createError } from "../utils/createError.js";
import { generateToken } from "../utils/generateToken.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { hashPassword } from "../utils/password.js";
import { setCookie } from "../utils/setCookie.js";

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

        const token = generateToken(createdUser._id);
        setCookie(res, "token", token);

        sendVerificationEmail(createdUser);

        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: {
                _id: createdUser._id,
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
    try {
    } catch (error) {
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

export const verifyEmail = async (req, res, next) => {
    const { code } = req.body;
    try {
        if (!code) throw createError("Verification code is required");

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
            data: { id: userToVerify._id, email: userToVerify.email },
        });
    } catch (error) {
        console.log(
            `[Auth.verifyEmail] Failed to verify email: ${error.message}`
        );
        next(error);
    }
};
