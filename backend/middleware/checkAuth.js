import { verifyToken } from "../utils/auth.js";
import { createError } from "../utils/createError.js";
import { devLog } from "../utils/logs.js";

export const checkAuth = (req, res, next) => {
    const { token } = req.cookies;

    try {
        if (!token) throw createError("Authentication token is missing", 401);

        const decoded = verifyToken(token);
        if (!decoded)
            throw createError("Invalid or expired authentication token", 401);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        devLog(`[checkAuth] ${error.message}`);
        next(error);
    }
};
