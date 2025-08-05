import { NODE_ENV } from "../config/env.js";

export const setCookie = (res, cookieName, cookie, ageInDays = 7) => {
    res.cookie(cookieName, cookie, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: ageInDays * 24 * 60 * 60 * 1000, // Defaults to 7
    });
};
