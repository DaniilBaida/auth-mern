import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

import crypto from "crypto";

export const generateAccessToken = (userId) => {
    return jwt.sign({ userId, purpose: "access" }, JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const generateResetToken = () => {
    return crypto.randomBytes(32).toString("hex");
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

//Generates a random code based on the provided characters and length
export const generateVerificationCode = (length = 6, expiresInHours = 24) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        code += chars[randomIndex];
    }
    return {
        code,
        expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000), // 24 hours in ms
    };
};
