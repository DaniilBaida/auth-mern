import crypto from "crypto";

//Generates a random code based on the provided characters and length
export const generateVerificationCode = (length = 6) => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        code += chars[randomIndex];
    }
    return {
        code,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours in ms
    };
};
