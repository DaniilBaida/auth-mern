import { Router } from "express";
import {
    login,
    logout,
    register,
    verifyEmail,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/verify-email", verifyEmail);

export default authRouter;
