import { MailtrapClient } from "mailtrap";
import { MAILTRAP_TOKEN } from "./env.js";

export const mailtrapClient = new MailtrapClient({
    token: MAILTRAP_TOKEN,
});

export const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
};
