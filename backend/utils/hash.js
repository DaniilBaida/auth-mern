import bcrypt from "bcryptjs";
import crypto from "crypto";
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

export const comparePassword = async (password, passwordToMatch) => {
    return await bcrypt.compare(password, passwordToMatch);
};
