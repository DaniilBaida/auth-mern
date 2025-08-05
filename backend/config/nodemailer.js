import { GOOGLE_APP_PASSWORD } from "./env.js";
import nodemailer from "nodemailer";

export const nodemailerTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "devbaida78@gmail.com",
        pass: GOOGLE_APP_PASSWORD,
    },
});

export const sender = "devbaida78@gmail.com";
