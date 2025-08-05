import { Router } from "express";
import {
    getCurrentUser,
    login,
    logout,
    register,
    resetPassword,
    sendEmailVerificationLink,
    sendPasswordResetLink,
    verifyEmail,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

const authRouter = Router();

authRouter.get("/me", checkAuth, getCurrentUser);

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/verify-email", sendEmailVerificationLink);
authRouter.post("/verify-email/confirm", verifyEmail);

authRouter.post("/forgot-password/", sendPasswordResetLink);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
