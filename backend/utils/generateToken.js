import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const JWT_EXPIRES_IN = "7d";
//Generates a JWT Token and sets it in cookies
export const generateToken = async (userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });

    return token;
};
