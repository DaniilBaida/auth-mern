import bcrypt from "bcryptjs";

export function hashPassword(password) {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
}
