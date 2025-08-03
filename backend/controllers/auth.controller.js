import { createError } from "../utils/createError.js";
import { User } from "../models/User.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "../utils/generateToken.js";
import { sendVerificationEmail } from "../email/sendEmail.js";

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

        generateToken(res, createdUser._id);

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
    } catch (error) {
        next(error);
    }
};
