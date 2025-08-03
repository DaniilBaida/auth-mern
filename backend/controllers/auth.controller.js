import { createError } from "../utils/createError";

export const register = async (req, res, next) => {
    const { nome, email, password } = req.body;
    try {
        if (!nome || !email || !password) {
            throw createError("Missing required fields", 400);
        }
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
