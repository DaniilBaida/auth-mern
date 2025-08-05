import { Router } from "express";
import {
    login,
    logout,
    register,
    resetPassword,
    sendEmailVerificationLink,
    sendPasswordResetLink,
    verifyEmail,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/verify-email", sendEmailVerificationLink);
authRouter.post("/verify-email/confirm", verifyEmail);

authRouter.post("/reset-password/", sendPasswordResetLink);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
