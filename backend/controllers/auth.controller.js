import { createError } from "../utils/createError";
import { User } from "../models/User";
import { hashPassword } from "../utils/hashPassword";

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (!nome || !email || !password) {
            throw createError("Missing required fields", 400);
        }

        const existingUser = User.findOne({ email });
        if (existingUser) throw createError("User already exists", 409);

        const createdUser = User.create({
            name,
            email,
            password: hashPassword(password),
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
