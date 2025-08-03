import { config } from "dotenv";

config({ path: "./backend/.env" });

export const { PORT, DB_URI, JWT_SECRET, NODE_ENV, MAILTRAP_TOKEN } =
    process.env;
